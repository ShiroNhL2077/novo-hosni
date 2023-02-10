import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';

export default function PaymentMethodScreen() {
    const navigate = useNavigate();
    const {state,dispatch : ctxDispatch} = useContext(Store);
    const {
        cart : {shippingAddresse,paymentMethod} ,
    } = state;
    useEffect(()=>{
        if(!shippingAddresse.address){
            navigate('/shipping')
        }
    },[shippingAddresse,navigate]);
    const [paymentMethodName,setPaymentMethodName] = useState(paymentMethod || 'paypal');
    const submitHandler = (e) => {
            e.preventDefault();
            ctxDispatch({type: 'SAVE_PAYMENT_METHOD' , payload : paymentMethodName});
            localStorage.setItem("paymentMethod" , paymentMethodName);
            navigate('/placeorder');

    }
  return (
    <div>
        <Helmet>
            <title>Payment Method</title>
        </Helmet>
        <form onSubmit={submitHandler}>
            <p>choose methode payment : </p>
            <h1>PayPal </h1> <span>
                <input type="radio" 
                checked={paymentMethodName === "paypal"}
                name="payMeth" 
                value="paypal" 
                onChange={(e)=>setPaymentMethodName(e.target.value)} /></span>
            <h1>Stripe </h1>
             <span><input type="radio" 
             name="payMeth" 
             value="stripe" 
             checked={paymentMethodName === "stripe"}
             onChange={(e)=>setPaymentMethodName(e.target.value)}
             /></span>
             <button type='submit'>Continue</button>
        </form>
    </div>
  )
}
