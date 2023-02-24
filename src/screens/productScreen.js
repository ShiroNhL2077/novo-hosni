import React, { useContext, useEffect, useReducer } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios' ;
import { Helmet } from 'react-helmet-async';
import Message from '../components/Message';
import Loading from '../components/loading/Loading';
import { getError } from '../utils/utils';
import { Store } from '../Store';
import Magnifier from "react-magnifier";
import './product.css'

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
   loading ? (<Loading></Loading> ): 
   error ?  (<Message>{error}</Message>) :
   <div className='mt-5'>
       <Helmet><title>{product.name}</title></Helmet>
    <main className="py-5 min-vh-100 d-flex flex-column align-items-center">
      <div className="container d-flex justify-content-center mb-5">
        <Magnifier src={product.image} width={200} />;
        <div className="me-5">{/* <img src="imgs/clear.png" alt /> */}</div>
        <div className="d-flex flex-column justify-content-evenly">
          <small className="text-secondary">SMOKE</small>
          <h2 className="text-light">{product.name}</h2>
          <span className="text-secondary fst-italic">€{product.price}</span>
{/*       
          <small className="text-secondary">Quantity :</small>
          <input
            type="number"
            className="quant bg-dark text-light rounded px-2 py-1"
            min={1}
            max={50}
            id
          />
         */}
          {product.countInStock > 0 ? ( <div className='text-success display-2'>IN STOCK</div> ) :
           (<div className='text-danger display-2'>OUT OF STOCK</div>)}
   {product.countInStock > 0 ? ( <button className='btn btn-success  text-center' onClick={addToCartHandler}>Add to cart</button> ) 
   : (<div></div>)}
        </div>
      </div>
      <div className="info w-50 text-light">
        {/* <h2 className="mb-3">GENERAL INFORMATION</h2> */}
        <p className="mb-5">
         {product.description && product.description}
        </p>
        <h3 className="mb-3">Key Features</h3>
        <ul className="mb-5">
          <li className="mb-2">Size: 78*42*25mm</li>
          <li className="mb-2">E-liquid Capacity: 13ml</li>
          <li className="mb-2">Nicotine Strength: 5%</li>
          <li className="mb-2">Battery Capacity: 650mAh</li>
          <li className="mb-2">Puffs: 6000</li>
          <li className="mb-2">Rechargeable via USB-C</li>
          <li className="mb-2">1A Charging Current</li>
          <li className="mb-2">17W Max Power</li>
          <li>Airflow Adjustable</li>
        </ul>
        <h3 className="mb-3">Category</h3>
        <p className="mb-3">
         {product.category && product.category}
        </p>
        {/* <h4 className="mb-3">Flavor</h4>
        <p className="mb-3">Clear : Menthol</p> */}
        <h4 className="mb-3">Notes</h4>
        <small>
          For further questions and concerns, we suggest contacting your health
          professional regarding the impact of vaping and ingestion of nicotine.
        </small>
      </div>
    </main>
    {/*  */}
   </div>
  )
}
