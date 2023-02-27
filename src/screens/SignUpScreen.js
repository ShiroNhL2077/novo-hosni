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
        <main className="form-container">
      <form className="form text-light" onSubmit={submitHandler}>
        <div className="row">
        
          <div class="mb-3 col-12">
            <label for="exampleInputEmail1" class="form-label">
               Username
            </label>
            <input
              type="text" required onChange={(e)=>setName(e.target.value)}
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
        </div>
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
        <div className="row">
          <div class="mb-3 col-6">
            <label for="exampleInputPassword1" class="form-label">
               password
            </label>
            <input
             type="password" required onChange={(e)=>setPassword(e.target.value)}
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div class="mb-3 col-6">
            <label for="exampleInputPassword1" class="form-label">
              Re-enter password
            </label>
            <input
             type="password" required onChange={(e)=>setConfirmPassword(e.target.value)}
              class="form-control"
              id="exampleInputPassword1"
            />
          </div>
        </div>
      
        <div className="sign-in-btn-container">
          <button type="submit" class="sign-in-btn">
            <span>SIGN UP</span>
          </button>
        </div>
        <div className="mt-3 d-flex justify-content-center">
          <span className="text-light">
            Already have an account ?{" "}
            <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>

          </span>
        </div>
      </form>
    </main>
    </div>
  )
}
