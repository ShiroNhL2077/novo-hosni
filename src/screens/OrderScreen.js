import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Store } from "../Store";
import { getError } from "../utils/utils";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import StripeCheckout from "../components/StripeCheckout";
import Loading from "../components/loading/Loading";



const stripePromise = loadStripe("pk_test_51MaJv2GDnyWn5J3SkFk3LcQPqqWyBRimHUu69HpgZh6UCRK1z5dx8NUkVSFudKW4l8P545GOLmMhVV1w5sGt3ivR00yVmwVaXd");



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
  const [payMeth,setPayMeth] = useState(localStorage.getItem('paymentMethod'))
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
   <div>{error}</div> :<div className="pt-5">
     <Helmet>
    <title>Order {orderId} </title>
   </Helmet>
 
    <div className="text-light row m-5 ">
        {/* {order.orderItems.map((item,i) => (
            <div key={item._id}>
                <img src={item.image} alt="order_img" />
                <Link to={`/product/${item.slug}`}>{item.name}</Link>
            <span>{item.quantity}</span>
            <span>{item.price} $</span>

            </div>
        ))} */}
           <div className="text-light col-md-4 col-lg-4 col-sm-12">
          <h1>Order Summary</h1>
          <div className="text-light">
    <strong>Name : </strong> <span>{order.shippingAddresse.fullName}</span>
    <br></br>
    <strong>Addresse : </strong> <span>{order.shippingAddresse.address}</span>
    <br>
    </br>
     <span>{order.shippingAddresse.city},
     <br></br>
     {order.shippingAddresse.postalCode},
     <br></br>,
     {order.shippingAddresse.country} </span>
   </div>
   <div className="text-light my-2">
   {order.isDelivered ? (
    <span>Delivred at {order.deliveredAt}</span>
   ) : (
    <div className="text-danger">NOT DELIVRED</div>
   )}
   </div>
   <div className="text-light my-2">
   {order.isPaid ? (
    <span>Paid at {order.paidAt}</span>
   ) : (
    <div className="text-danger">NOT PAID</div>
   )}
   </div> 
        <div className="text-light">
     
          <p>Products price:    <span className="text-info"> €</span> {order.itemsPrice.toFixed(2)} 
       </p>
     
        <p className="text-light">Shipping : 
        <span className="text-info"> € </span> {order.shippingPrice.toFixed(2)}
        </p>
      
        
        <p>Tax : <span className="text-info"> €</span> {order.taxPrice.toFixed(2)}
       
         </p>
         
        <p>TOTAL : <span className="text-info"> €</span> {order.totalPrice.toFixed(2)}
         </p>
        </div>
        </div>
        <div className="paypal text-light col-lg-6 col-md-6 mt-5 pt-5" >
            {!order.isPaid && (
                <div>
                {isPending ? 
                (<Loading></Loading>) :
                payMeth === "paypal" ?
                
                (
                <PayPalButtons 
                createOrder={createOrder} 
                onApprove={onApprove}
                onError={onError}
                >

                </PayPalButtons>
               ) : 
               (<div className="container">
               <StripeCheckout />
               
               </div>)
               }
               {loadingPay && <Loading />}
                </div>
            )}
        </div>
  
    </div>
   </div>
}
