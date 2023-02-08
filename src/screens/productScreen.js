import React, { useContext, useEffect, useReducer } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios' ;
import { Helmet } from 'react-helmet-async';
import Message from '../components/Message';
import Loading from '../components/Loading';
import { getError } from '../utils/utils';
import { Store } from '../Store';

const reducer = (state,action) => {
  switch(action.type){
    case 'FETCH_REQUEST' :
      return {...state,loading : true};
    case 'FETCH_SUCCESS' : 
    return {...state,product : action.payload,loading : false};
    case 'FETCH_FAIL' : 
    return {...state, loading : false , error : action.payload};
    default : 
    return state;

  }
 }

export default function ProductScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const {slug} = params;
  const [{loading,error,product}, dispatch] = useReducer(reducer, {
    product : [],
    loading : true , 
    error : ''
  })
  useEffect(()=>{
    const fetchData = async () => {
      dispatch({type : 'FETCH_REQUEST'});
      try {
        const result = await axios.get(`http://127.0.0.1:5000/api/products/slug/${slug}`);
        console.log(result)
        dispatch({type : 'FETCH_SUCCESS', payload:result.data})
      } catch (error) {
        dispatch({type : 'FETCH_FAIL', payload : getError(error)});
      }
    };
    fetchData()
  },[slug]);

  const {state, dispatch : ctxDispatch} = useContext(Store);
  const {cart} = state;
const addToCartHandler = async () => {
  const existItem = cart.cartItems.find((x) => x._id === product._id);
  const quantity = existItem ? existItem.quantity + 1 : 1;
  const { data } = await axios.get(`http://127.0.0.1:5000/api/products/${product._id}`);
  if (data.countInStock < quantity) {
    window.alert('Sorry. Product is out of stock');
    return;
  }
  ctxDispatch({
    type: 'CART_ADD_ITEM',
    payload: { ...product, quantity },
  });
  navigate("/cart")
}
  return (
   loading ? (<Loading>loading ...</Loading> ): 
   error ?  (<Message>{error}</Message>) :
   <div><img alt='product-img' src={product.image} />
   <Helmet><title>{product.name}</title></Helmet>
   <p>{product.price} $</p>
   <p>Status :</p>
   {product.countInStock > 0 ? ( <div>In stock</div> ) : (<div>Out of stock</div>)}
   {product.countInStock > 0 ? ( <button onClick={addToCartHandler}>Add to cart</button> ) : (<div></div>)}
   </div>
  )
}
