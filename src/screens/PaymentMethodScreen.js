import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom';
import Steps from '../components/steps/Steps';
import { Store } from '../Store';
import './payMeth.css';



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
    const [optionCheck,setOptionCheck] = useState({state: true , meth : ""})
  return (
    <div>
        <Helmet>
            <title>Payment Method</title>
        </Helmet>
       
        {/* <form onSubmit={submitHandler}>
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
        </form> */} <form onSubmit={submitHandler}>
        <div className='container my-5 pt-5'>
            
        <Steps step1 step2 step3></Steps>
            <div className='payText mt-5'>
            <p>How would you like to pay ? </p>
            <p>(Click one of the options below)</p>
            </div>
           
            <div className='options mt-5 d-flex justify-content-around'>
        
                <div className={optionCheck.meth === "master" ? "payChecked" : "pay"} 
                onClick={()=>{setPaymentMethodName("stripe"); setOptionCheck({state : false,meth : 'master'})}}
                name="payMeth" 
                value="stripe" 
                checked={paymentMethodName === "stripe"}
                >
                <img alt="checkout" width={'50%'} src="https://icons-for-free.com/download-icon-card+credit+card+debit+card+master+card+icon-1320184902079563557_512.png"/>
                </div>
               
                <div
                checked={paymentMethodName === "paypal"}
                name="payMeth" 
                value="paypal" 
                className={optionCheck.meth === "paypal" ? "payChecked" : "pay"} 
                onClick={()=>{setPaymentMethodName("paypal");setOptionCheck({state : false,meth : 'paypal'})}}>
{/* <i class="bi bi-check2"></i> */}
                <img alt="checkout"  width={'50%'}  src="https://cdn-icons-png.flaticon.com/512/196/196566.png"/>
                </div>
                
            </div>
<div className='check'></div>
        </div>
<div className='align-center text-center'> 
{optionCheck.state ? 
<button className='btn btn-continue' disabled={optionCheck.state}>Continue</button> :
<button className='btn btn-continue active' type='submit'>Continue</button>}
</div>
</form>
    </div>
   
  )
}
