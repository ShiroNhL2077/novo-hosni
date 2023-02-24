import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Steps from '../components/steps/Steps';
import { Store } from '../Store';
import './signIn.css'


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
        
        <main className="container mt-5">
        <Steps step1 ></Steps>
      <form className="form-container text-light " onSubmit={submitHandler}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email" required onChange={(e)=>setEmail(e.target.value)}
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password" required onChange={(e)=>setPassword(e.target.value)}
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
    
        <div className="sign-in-btn-container">
          <button type="submit" class="sign-in-btn ">
          SIGN IN
          </button>
        </div>
      </form>
      <div className="divider">
        <div></div>
      </div>
      <div className="sign-up-btn-container">
        <span className="mb-4 text-light">
        New costumer ?{" "}
          <Link to={`/signup?redirect=${redirect}`}>Create account</Link>
        </span>
      </div>
    </main>
    </div>
  )
}
