import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Store } from '../Store';

export default function SignInScreen() {
    const navigate = useNavigate();
    const {search} = useLocation();
    const redirectURL = new URLSearchParams(search).get('redirect');
    const redirect = redirectURL ? redirectURL : '/';
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const {state, dispatch : ctxDispatch} = useContext(Store);
    const {userInfo} = state;
    const submitHandler = async (e) => {
            e.preventDefault();
            try {
                const {data} = await axios.post('http://127.0.0.1:5000/api/users/signin' , {
                    email,
                    password
                }); 
                ctxDispatch({type : 'USER_SIGNIN' , payload : data });
                localStorage.setItem('userInfo' , JSON.stringify(data));
                navigate(redirect || '/')

            } catch (error) {
                alert('invalid email or password')
            }
    }
    useEffect(() => {
        if (userInfo) {
          navigate(redirect);
        }
      }, [navigate, redirect, userInfo]);
  return (
    <div>
        <Helmet>
            <title>Sign In</title>
        </Helmet>
        <form onSubmit={submitHandler}>
            <label>Email</label>
            <input type="email" required onChange={(e)=>setEmail(e.target.value)}/>
            <br></br>
            <label>Password</label>
            <input type="password" required onChange={(e)=>setPassword(e.target.value)} />
            <br></br>
            <button type="submit" >Sign In</button>
            <br></br>
            <label>New costumer ?</label>
            <Link to={`/signup?redirect=${redirect}`}>Create account</Link>
        </form>
    </div>
  )
}
