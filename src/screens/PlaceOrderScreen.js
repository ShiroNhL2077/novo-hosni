import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import Steps from '../components/steps/Steps';
import { Store } from '../Store';
import { Carousel } from '@trendyol-js/react-carousel';
import RightArrow from '../components/Arrows/RightArrow';
import LeftArrow from '../components/Arrows/LeftArrow';
import './placeOrder.css'
import Loading from '../components/loading/Loading';

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
cart.shippingPrice = cart.cartItems.length >= 4 ? 2.99 : 1.95;
cart.taxPrice = round2(0.19 * cart.itemsPice) ;
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
 
  dispatch({type : 'CREATE_SUCCESS'});
   // ctxDispatch({type : 'CART_CLEAR'});
  // localStorage.removeItem('cartItems');
  navigate(`/order/${data.order._id}`);

} catch (error) {
  dispatch({type : 'CREATE_FAIL'});
  alert('err')
}
}

window.onbeforeunload = function() {
  return "you can not refresh the page";
}

useEffect(()=> {
  if(!cart.paymentMethod) {
    navigate('/payment');
  }
},[cart,navigate])
  return (
    <div className='pt-5'>
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <div className='mt-5 container'>
      <Steps step1 step2 step3 step4></Steps>
      

   
      <h1 className='text-warning text-center mt-5'>Preview Order</h1>
      <div className='text-light pb-3'>
        <p>Name : <span>{cart.shippingAddresse.fullName}</span>
</p> 
        <p>Addresse : <span>{cart.shippingAddresse.address} ,
         {cart.shippingAddresse.city}</span>
        <span>{cart.shippingAddresse.postalCode},
        {cart.shippingAddresse.country}</span></p> 
      
    {/* <p className='text-light mt-5'>Products : ({cart.cartItems.length} product)</p> */}
       <Carousel className='py-5' responsive={true} show={3.5}  swiping={true} infinite rightArrow={<RightArrow />} leftArrow={<LeftArrow />}>
        {/* <div className='d-flex'> */}
          {cart.cartItems.map((item,i) => (
          
            <div key={i} className="orderItem text-dark">
              <Link to={`/product/${item.slug}`} >
              <img src={item.image} width={'50%'} className="float-end" alt={item.name} />  
              </Link>
              <Link to={`/product/${item.slug}`} 
              className="text-decoration-none text-dark text-center">{item.name}</Link>
              <div className='my-5'>
              <p>Quantity : {item.quantity}</p>
              <p style={{marginBottom : '0px'}}>Price : <span className='text-success'>€{item.price}</span></p>
               <p>Totale :<span className='text-success'>€{item.price * item.quantity}</span></p>
               </div>
            </div>
       
          ))}
        {/* </div> */}
        </Carousel>
        <Link to="/shipping" className='mt-5 mx-5'>Edit </Link>
      </div>
      <div className='text-light mx-5'> 
        <div className='d-flex justify-content-between'>
         <div>
        <div className='mb-5 '>
        <p>Shipping fee :  €{cart.shippingPrice.toFixed(2)}  
         <span className='px-3 text-secondary'>( 1~3 pieces : €1,95  
         / 4 pieces or more : €2,99 )</span>
         </p>
        <p>Tax (19%) : € {cart.taxPrice.toFixed(2)}  </p>
        </div>
        <p>Products price :  €{cart.itemsPice.toFixed(2)}</p>
        <p>TOTAL Price :  €{cart.totalPrice.toFixed(2)} </p>
        </div>
        <div className='align-self-end '>
        <button className='btn btn-warning' disabled={cart.cartItems.length === 0}
         onClick={placeOrderHandler}>Place an order</button>
        </div>
        </div>
        {loading && <Loading />}
      </div>
    </div>
    </div>
  )
}
