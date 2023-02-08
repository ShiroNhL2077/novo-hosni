import React, { useContext } from 'react'
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Store } from '../Store'

export default function CartScreen() {
    const {state, dispatch : ctxDispatch} =useContext(Store);
    const {
        cart : {cartItems},
    } = state ;
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
                    <button disabled={item.quantity === 1}>
                    -
                    </button>
                    <span>{item.quantity}</span>
                    <button disabled={item.quantity === item.countInStock}>
                    +
                    </button>
                    <button>
                    X
                    </button>
                   
                </div>
            ))}
             <div>
                        <h6> SUBTOTAL :  <span>{cartItems.reduce((a,c)=> a+ c.quantity , 0)} item </span></h6>
                        <h4> {cartItems.reduce((a,c)=> a + c.quantity * c.price , 0)} $ </h4>
                       
                    </div>
        </div>
         }
        </div>
  )
}
