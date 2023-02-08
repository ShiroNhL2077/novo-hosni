import axios from 'axios';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Store } from '../Store';

export default function Product(props) {
    const { product } = props;
    const {state, dispatch : ctxDispatch} = useContext(Store);
    const {cart : {cartItems},} = state;
    const addToCartHandler = async (item) => {
        const existItem = cartItems.find((x) => x._id === product._id);
  const quantity = existItem ? existItem.quantity + 1 : 1;
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
  return (
    <div className="product" key={product.slug}>
    <Link to={`/product/${product.slug}`}>
     <img  src={product.image} alt={product.name} />
     </Link>
  <div className="product-info">
  <Link to={`/product/${product.slug}`}>
  <p>{product.name}</p>
  </Link>
     <p><strong>{product.price}</strong></p>
    {product.countInStock === 0 ? <button disabled>Out of stock</button>  : <button onClick={()=>addToCartHandler(product)}>Add to card</button>}
     
  </div>
   </div>
  )
}
