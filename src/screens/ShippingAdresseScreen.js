import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store'

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
    <div>
        <Helmet>
            <title>Shipping Address</title>
        </Helmet>
        <h1>Shipping Address</h1>
        <form onSubmit={submitHandler}>
            <label>Full Name</label>
            <input value ={fullName} type="text" onChange={(e)=>setFullName(e.target.value)} />
            <br></br>
            <label>Address</label>
            <input value ={address} type="text" onChange={(e)=>setAddress(e.target.value)} />
            <br></br>
            <label>City</label>
            <input value ={city} type="text" onChange={(e)=>setCity(e.target.value)} />
            <br></br>
            <label>Country</label>
            <input value ={postalCode} type="text" onChange={(e)=>setCountry(e.target.value)} />
            <br></br>
            <label>Postal Code</label>
            <input value ={country} type="text"  onChange={(e)=>setPostal(e.target.value)} />
            <button>Continue</button>
        </form>
    </div>
  )
}
