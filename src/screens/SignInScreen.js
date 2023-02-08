import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation } from 'react-router-dom'

export default function SignInScreen() {

    const {search} = useLocation();
    const redirectURL = new URLSearchParams(search).get('redirect');
    const redirect = redirectURL ? redirectURL : '/'
    
  return (
    <div>
        <Helmet>
            <title>Sign In</title>
        </Helmet>
        <form>
            <label>Email</label>
            <input type="email" required/>
            <br></br>
            <label>Password</label>
            <input type="password" required/>
            <br></br>
            <button type="submit" >Sign In</button>
            <br></br>
            <label>New costumer ?</label>
            <Link to={`/signup?redirect=${redirect}`}>Create account</Link>
        </form>
    </div>
  )
}
