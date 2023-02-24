import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom';
import Steps from '../components/steps/Steps';
import { Store } from '../Store'
import './shipping.css'

export default function ShippingAdresseScreen() {

  
    const navigate = useNavigate();
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
      userInfo,
      cart: { shippingAddresse },
    } = state;
    const [fullName, setFullName] = useState(shippingAddresse.fullName || '');
    const [address, setAddress] = useState(shippingAddresse.address || '');
    const [country, setCountry] = useState(shippingAddresse.country || '');
    const [city, setCity] = useState(shippingAddresse.city || '');
    const [postalCode, setPostal] = useState(
        shippingAddresse.postalCode || ''
    );
    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({
          type: 'SAVE_SHIPPING_ADDRESS',
          payload: {
            fullName,
            address,
            city,
            postalCode,
            country,
            location: shippingAddresse.location,
          },
        });
        localStorage.setItem(
          'shippingAddress',
          JSON.stringify({
            fullName,
            address,
            city,
            postalCode,
            country,
            location: shippingAddresse.location,
          })
        );
        navigate('/payment');
      };
      useEffect(() => {
        if (!userInfo) {
          navigate('/signin?redirect=/shipping');
        }
      }, [userInfo, navigate]);
  return (
    <div className='mt-5 pt-5'>
        <Helmet>
            <title>Shipping Address</title>
        </Helmet>
       
        <main className="container mt-5">
        <Steps step1 step2></Steps>
      <form className="form-container text-light" onSubmit={submitHandler}>
        <h2 className="text-light text-center">Shipping Address</h2>
        <div className="row row-cols-1">
          <div className="mb-3 col">
            <label for="exampleInputName1" className="form-label">
              Full Name
            </label>
            <input
            value ={fullName} type="text" onChange={(e)=>setFullName(e.target.value)}
        
              className="form-control"
              id="exampleInputName12"
              aria-describedby="nameHelp"
            />
          </div>
          <div className="mb-3 col">
            <label for="exampleInputEmail1" className="form-label">
              Home Address
            </label>
            <input
            value ={address} type="text" onChange={(e)=>setAddress(e.target.value)}
            
              className="form-control"
              id="exampleInputEmail11"
              aria-describedby="emailHelp"
            />
          </div>
        </div>
        <div className="mb-3 col">
          <label for="exampleInputEmail1" className="form-label">
            City
          </label>
          <input
          value ={city} type="text" onChange={(e)=>setCity(e.target.value)}
         
            className="form-control"
            id="exampleInputEmail10"
            aria-describedby="emailHelp"
          />
        </div>
          
          <div className="mb-3 col">
            <label for="exampleInputPassword1" className="form-label">
              Country
            </label>
            <input
             value ={country} type="text" onChange={(e)=>setCountry(e.target.value)}
             
              className="form-control"
              id="exampleInputPassword7"
            />
          </div>
          <div className="mb-3 col">
            <label for="exampleInputPassword2" className="form-label">
              Postal Code
            </label>
            <input
            value ={postalCode} type="text"  onChange={(e)=>setPostal(e.target.value)}
            
              className="form-control"
              id="exampleInputPassword8"
            />
          </div>
        <div className="sign-in-btn-container">
          <button type="submit" className="btn btn-warning">
           Continue
          </button>
        </div>
      </form>
    </main>
    </div>
  )
}
