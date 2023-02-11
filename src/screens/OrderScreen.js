import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Store } from "../Store";
import { getError } from "../utils/utils";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false };

    case "DELIVER_REQUEST":
      return { ...state, loadingDeliver: true };
    case "DELIVER_SUCCESS":
      return { ...state, loadingDeliver: false, successDeliver: true };
    case "DELIVER_FAIL":
      return { ...state, loadingDeliver: false };
    case "DELIVER_RESET":
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };
    default:
      return state;
  }
}

export default function OrderScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  const [
    {
      loading,
      error,
      order,
      successPay,
      loadingPay,
      loadingDeliver,
      successDeliver,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
    successPay: false,
    loadingPay: false,
  });
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
function createOrder(data,actions){
    return actions.order
    .create({
        purchase_units : [
            {
                amount : { value : order.totalPrice,}
            }
        ]
    })
    .then((orderID) => {
        return orderID;
    });
}

function onApprove(data, actions){
    return actions.order.capture().then(async function (details){
        try {
            dispatch({ type : 'PAY_REQUEST'});
            const { data } = await axios.put(
                `http://127.0.0.1:5000/api/orders/${order._id}/pay`,
                details,
                {
                    headers : { authorization : `Bearer ${userInfo.token}`},
                }
            );
            dispatch({type : 'PAY_SUCCESS' , payload : data});
            alert('success')
        } catch (error) {
            dispatch({type : 'PAY_FAIL' , payload : getError(error)});
            alert("err")
        }
    })
}
function onError(err) {
    alert('err')
}
  useEffect(() => {
    const fetchOrder = async () => {
        try {
            dispatch({type : 'FETCH_REQUEST'});
            const { data } = await axios.get(`http://127.0.0.1:5000/api/orders/${orderId}` , {
                headers : {authorization : `Bearer ${userInfo.token}`},
            });
            dispatch({type : 'FETCH_SUCCESS' , payload : data });
        } catch (error) {
            dispatch({type : 'FETCH_FAIL' , payload : getError(error)})
        }
    }
    if (!userInfo) {
      return navigate("/login");
    }
    if(!order._id || successPay || (order._id && order._id  !== orderId ) ) 
    {fetchOrder();
    if(successPay){
        dispatch({type : 'PAY_RESET'});
    }
    }else{
       const loadPaypalScript = async() => {
        const {data : clientId} = await axios.get('http://127.0.0.1:5000/api/keys/paypal' , {
            headers : {authorization : `Bearer ${userInfo.token}`},
           
        });
        paypalDispatch({
            type : 'resetOptions',
            value : {
                'client-id' : clientId,
                currency : 'EUR'
            }
        });
        paypalDispatch({ type : 'setLoadingStatus' , value : 'pending'});

       };
       loadPaypalScript();
    }
  }, [order, userInfo,orderId, navigate,paypalDispatch, successPay]);

  return loading ?
   <div>...loading</div> : error ?
   <div>{error}</div> :<div>
     <Helmet>
    <title>Order {orderId} </title>
   </Helmet>
   <div>
    <strong>Name : </strong> <span>{order.shippingAddresse.fullName}</span>
    <strong>Addresse : </strong> <span>{order.shippingAddresse.address}</span>
     <span>{order.shippingAddresse.city},{order.shippingAddresse.postalCode},{order.shippingAddresse.country} </span>
   </div>
   <div>
   {order.isDelivered ? (
    <span>Delivred at {order.deliveredAt}</span>
   ) : (
    <div>NOT DELIVRED</div>
   )}
   </div>
   <div>
   {order.isPaid ? (
    <span>Paid at {order.paidAt}</span>
   ) : (
    <div>NOT PAID</div>
   )}
   </div>
    <div>
        {order.orderItems.map((item,i) => {
            <div key={item._id}>
                <img src={item.image} />
                <Link to={`/product/${item.slug}`}>{item.name}</Link>
            <span>{item.quantity}</span>
            <span>{item.price} $</span>

            </div>
        })}
           <div>Order Summary 
        <div><p>Products : {order.itemsPrice.toFixed(2)}</p>
        <p>Shipping : {order.shippingPrice.toFixed(2)}</p>
        <p>Tax : {order.taxPrice.toFixed(2)} </p>
        <p>TOTAL : {order.totalPrice.toFixed(2)} </p>
        </div>
        </div>
        <div className="paypal" >
            {!order.isPaid && (
                <div>
                {isPending ? 
                (<span>...Loading</span>) :  (
                <PayPalButtons createOrder={createOrder} 
                onApprove={onApprove}
                onError={onError}
                >

                </PayPalButtons>
               )}
               {loadingPay && <div>Loading pay ...</div>}
                </div>
            )}
        </div>
    </div>
   </div>
}
