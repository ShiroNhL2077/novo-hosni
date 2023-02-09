import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Store } from '../Store';

export default function SignUpScreen() {
    const navigate = useNavigate();
    const {search} = useLocation();
    const redirectURL = new URLSearchParams(search).get('redirect');
    const redirect = redirectURL ? redirectURL : '/';
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const {state, dispatch : ctxDispatch} = useContext(Store);
    const {userInfo} = state;
    const submitHandler = async (e) => {
            e.preventDefault();
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
              }
            try {
                const {data} = await axios.post('http://127.0.0.1:5000/api/users/signup' ,  {
                    name,
                    email,
                    password,
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
            <title>Sign Up</title>
        </Helmet>
        <form onSubmit={submitHandler}>
        <label>Name</label>
            <input type="text" required onChange={(e)=>setName(e.target.value)}/>
            <br></br>
            <label>Email</label>
            <input type="email" required onChange={(e)=>setEmail(e.target.value)}/>
            <br></br>
            <label>Password</label>
            <input type="password" required onChange={(e)=>setPassword(e.target.value)} />
            <br></br>
            <label>Confirm Password</label>
            <input type="password" required onChange={(e)=>setConfirmPassword(e.target.value)} />
            <br></br>
            <button type="submit" >Sign Up</button>
            <br></br>
            <label>Already have an account ?</label>
            <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
        </form>
    </div>
  )
}
