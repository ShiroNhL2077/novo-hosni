import React from 'react'
import { Link } from 'react-router-dom';

export default function Product(props) {
    const { product } = props;
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
    
     
  </div>
   </div>
  )
}
