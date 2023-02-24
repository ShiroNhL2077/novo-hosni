import axios from 'axios';
import React, { useContext } from 'react'
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store'
import "./panier.css";

const round2 = (num) => Math.round(num *100 + Number.EPSILON) / 100 ; //123.2345 => 123.23


export default function CartScreen() {
    const navigate = useNavigate();
    const {state, dispatch : ctxDispatch} =useContext(Store);
    const {
        cart : {cartItems},
    } = state ;
const removeItemHandler = (item) => {
    ctxDispatch({type : 'CART_REMOVE_ITEM' , payload : item})
}
const updateCartHandler = async (item,quantity) => {
const {data} = await axios.get(`http://127.0.0.1:5000/api/products/${item._id}`) ;
if (data.countInStock < quantity) {
    window.alert('Sorry. Product is out of stock');
    return;
  }
  ctxDispatch({
    type: 'CART_ADD_ITEM',
    payload: { ...item, quantity },
  });
}
    const checkoutHandler = () => {
        navigate('/signin?redirect=/shipping');
    }
  return (
    <div className='container mt-5'>
        <Helmet>
        <title>Shopping cart</title>
        </Helmet>
        <div className="mt-5 d-flex justify-content-between">
   <div>
   <h6 className='text-light'> Subtotal:  <span className='text-light'>
        {cartItems.reduce((a,c)=> a+ c.quantity , 0)} product </span></h6>
         <h4 className='text-light'> Total Price :  €{round2(cartItems.reduce((a,c)=> a + c.quantity * c.price, 0))}  </h4>
   </div>
 
<div>
  {cartItems.length === 0 ? <button  id='notAllowed' className=' btn btn-secondary ' disabled> Procced to checkout</button> :
   <button className='btn btn-warning ' onClick={checkoutHandler}> Procced to checkout</button>

   }
</div>           
                   
      </div>
      <main className=" d-flex justify-content-center flex-column pb-5">
      <div className="articles">
        {cartItems.length === 0 ? (
          <div className='text-center'>
          <img src="https://cdn-icons-png.flaticon.com/128/960/960616.png" width={"100px"}  />
          <br></br>
          <p className='text-light'>Empty cart </p>
          
                </div>
        ):(<div className="titles row">
          <div className="col-5 ">
            <span>Product</span>
          </div>
          
          <div className="col-5">
            <span>QUANTITY</span>
          </div>
         
          <div className="col-2 d-flex ">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash3"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
              </svg>
            </span>
          </div>
        </div>) }
        <div className="article">
          <div >
          {cartItems.length === 0 ? <div className='d-flex justify-content-center'>
        <Link to="/" >Go shopping</Link>
        </div> : 
              <>
                {cartItems.map((item)=>(
                    <div key={item._id} className="d-flex justify-content-between mb-5" >
                        <div className='col-5'>
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      <img width={'150px'} src={item.image} className="article-img" alt={item.slug} />
                        </div>
                     <div className='col-5'>
                     <button disabled={item.quantity === 1}
                     className="btn m-1 btn-sm btn-warning"
                     onClick={()=> updateCartHandler(item,item.quantity - 1)}>
                    -
                    </button>
                    <span className='text-light mx-2'>{item.quantity} </span>
                    <button disabled={item.quantity === item.countInStock} 
                    className="btn m-1 btn-sm btn-warning"
                    onClick={()=> updateCartHandler(item,item.quantity + 1)}>
                    +
                    </button>
                     </div>
                     <div className='col-2'>
                     <button
                     className="btn btn-sm btn-danger mx-3 my-1"
                     onClick={()=> removeItemHandler(item)}>
                    X
                    </button>
                     </div>
                  
                    </div>
                  
                ))}
                </>
              
            }
          </div>
        </div>
      </div>
      
    </main>
    
    
    {/* <div>
        {cartItems.length === 0 ?
        <div>
            <p>empty cart</p>
        <Link to="/" >Go shopping</Link>
        </div> :
         <div>
            {cartItems.map((item)=>(
                <div key={item._id}>
                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    <img width={'150px'} src={item.image} className="article-img" alt={item.slug} />
                    <button disabled={item.quantity === 1} onClick={()=> updateCartHandler(item,item.quantity - 1)}>
                    -
                    </button>
                    <span>{item.quantity}</span>
                    <button disabled={item.quantity === item.countInStock} onClick={()=> updateCartHandler(item,item.quantity + 1)}>
                    +
                    </button>
                    <button onClick={()=> removeItemHandler(item)}>
                    X
                    </button>
                   
                </div>
            ))}
             <div>
                        <h6> SUBTOTAL :  <span>{cartItems.reduce((a,c)=> a+ c.quantity , 0)} item </span></h6>
                        <h4> {cartItems.reduce((a,c)=> a + c.quantity * c.price , 0)} $ </h4>
                       
                    </div>
                    <div>
                       
                        <button onClick={checkoutHandler}> Procced to checkout</button>
                    </div>
        </div>
         }
        </div> */}
        </div>
  )
}
