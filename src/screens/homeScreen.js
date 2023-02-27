import React, { useEffect,useReducer,useState } from 'react'
import {Link} from "react-router-dom";
import axios from 'axios' ;
import logger from 'use-reducer-logger'
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import Message from '../components/Message';
import Loading from '../components/loading/Loading';
import { getError } from '../utils/utils';
import Banner from '../components/banner/banner'
import Awards from '../components/awards/Awards'
import Categories from '../components/categories/categories'
import Footer from '../components/footer/footer';

export default function HomeScreen() {


 const reducer = (state,action) => {
  switch(action.type){
    case 'FETCH_REQUEST' :
      return {...state,loading : true};
    case 'FETCH_SUCCESS' : 
    return {...state,products : action.payload,loading : false};
    case 'FETCH_FAIL' : 
    return {...state, loading : false , error : action.payload};
    
    default : 
    return state;

  }
 }
  // const [products,setProducts] = useState([]);
  const [{loading,error,products}, dispatch] = useReducer(logger(reducer), {
    products : [],
    loading : true , 
    error : ''
  })
  useEffect(()=>{
    const fetchData = async () => {
      dispatch({type : 'FETCH_REQUEST'});
      try {
        const result = await axios.get('http://localhost:5000/api/products');
        dispatch({type : 'FETCH_SUCCESS', payload:result.data.products})
      } catch (error) {
        dispatch({type : 'FETCH_FAIL', payload : getError(error)});
      }
      // setProducts(result.data)

    };
    fetchData()
  },[])
  
  return (
    <div>
      <Helmet>
        <title>vapyvape</title>
      </Helmet>

      {loading ? (
        <Loading></Loading>
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <Banner />
          <Categories />
          <main className="py-5">
            <div className="container text-center">
              <h2 className="text-light mb-5">
                <span className="text-info">{products && products.length}</span>{" "}
                FLAVORS AVAILABLE
              </h2>
              <div className="-container row row-cols-lg-3 px-5 g-5 justify-content-center row-cols-md-2 row-cols-1">
                {products &&
                  products.map((product) => (
                    <Product product={product} key={product.slug}></Product>
                  ))}
              </div>
            </div>
          </main>
          {/* Features */}
          <Footer />
        </>
      )}
    </div>
  );
}


