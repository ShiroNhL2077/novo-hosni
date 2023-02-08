import axios from 'axios';
import React, { useContext } from 'react'
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Store } from '../Store'

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
    <div><Helmet>
        <title>Shopping cart</title>
        </Helmet>
        {cartItems.length === 0 ?<div>
            <p>empty cart</p>
<Link to="/" >Go shopping</Link>
        </div> : <div>
            {cartItems.map((item)=>(
                <div key={item._id}>
                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    <img src={item.image} alt={item.slug} />
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
        </div>
  )
}
