import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { Store } from '../Store';


const reducer = (state,action) => {
  switch(action.type){
   case 'CREATE_REQUEST' : 
   return {...state, loading : true} ;
   case 'CREATE_SUCCESS' : 
   return {...state, loading : false} ;
   case 'CREATE_FAIL' : 
   return {...state, loading : false} ;
   default :
   return state;
  }
}

export default function PlaceOrderScreen() {
  const navigate = useNavigate();

  const [{loading , error} ,dispatch] = useReducer(reducer,{
    loading : false,
   
  })

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {  cart, userInfo } = state;
const round2 = (num) => Math.round(num *100 + Number.EPSILON) / 100 ; //123.2345 => 123.23
cart.itemsPice = round2(cart.cartItems.reduce((a,c)=> a+c.quantity * c.price, 0));
cart.shippingPrice = cart.itemsPice > 100 ? round2(0) : round2(10);
cart.taxPrice = round2(0.15 * cart.itemsPice) ;
cart.totalPrice =cart.itemsPice + cart.shippingPrice + cart.taxPrice ;

const placeOrderHandler = async () => {
try {
  dispatch({type : 'CREATE_REQUEST'});
  const {data} = await axios.post('http://127.0.0.1:5000/api/orders', {
    orderItems: cart.cartItems,
    shippingAddresse : cart.shippingAddresse,
    paymentMethod : cart.paymentMethod ,
    itemsPrice : cart.itemsPice,
    shippingPrice : cart.shippingPrice,
    taxPrice : cart.taxPrice,
    totalPrice : cart.totalPrice
  },
  {
    headers : {
      authorization : `Bearer ${userInfo.token}`
    }
  }
  );
  ctxDispatch({type : 'CART_CLEAR'});
  dispatch({type : 'CREATE_SUCCESS'});
  localStorage.removeItem('cartItems');
  navigate(`/order/${data.order._id}`);

} catch (error) {
  dispatch({type : 'CREATE_FAIL'});
  alert('err')
}
}

useEffect(()=> {
  if(!cart.paymentMethod) {
    navigate('/payment');
  }
},[cart,navigate])
  return (
    <div>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1>Preview Order</h1>
      <div>
        <label>Name : </label> 
        <span>{cart.shippingAddresse.fullName}</span>
        <br></br>
        <label>Addresse : </label> 
        <span>{cart.shippingAddresse.addresse} , {cart.shippingAddresse.city}</span>
        <span>{cart.shippingAddresse.postalCode},{cart.shippingAddresse.country}</span>
        <div>
          {cart.cartItems.map((item,i) => (
            <div key={i}>
              <img src={item.image} alt={item.name} />
              <Link to={`/product/${item.slug}`}>{item.name}</Link>
              <p>Qte : {item.quantity}</p>
              <p>Price : {item.price} $</p>
            </div>
          ))}
        </div>
        <Link to="/shipping">Edit </Link>
      </div>
      <div>Order Summary 
        <div><p>Products : {cart.itemsPice.toFixed(2)}</p>
        <p>Shipping : {cart.shippingPrice.toFixed(2)}</p>
        <p>Tax : {cart.taxPrice.toFixed(2)} </p>
        <p>TOTAL : {cart.totalPrice.toFixed(2)} </p>
        <button disabled={cart.cartItems.length === 0} onClick={placeOrderHandler}>Place an order</button>
        </div>
        {loading && <div> ... spinner</div>}
      </div>
    </div>
  )
}
