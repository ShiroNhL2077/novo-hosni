import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../../Store";
import './navbar.css'
export default function Navbar() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {  cart, userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({type :'USER_SINGOUT'});
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  }
  return (
    <nav className="navbar bg-dark navbar-expand-lg top-nav" >
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="/">
          <img src="./vapyvape.png" width={"70px"} className="mx-3" alt="logo"/>
        </Link>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2rem"
              height="2rem"
              fill="#fff"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </span>
        </button>
        <div
          className="collapse navbar-collapse ms-md-5 justify-content-between"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0">

          </ul>
          <div>
    
            <Link to="/cart" role="button" className="text-decoration-none cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2rem"
                height="1.2rem"
                fill="white"
                className="bi bi-bag-fill "
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z" />
              </svg>
              
              <span className="text-light me-3 ">    {
            cart.cartItems.length > 0 && (
            <span>
              {cart.cartItems.reduce((a,c)=>a+c.quantity,0)}
            </span>
          )
        }</span>
            </Link>
          
            {/* <Link to="/profile" role="button" className="text-decoration-none"> */}
            {userInfo  ?<span> 
              <span className="text-light mx-2">{userInfo.name}</span>
              <Link  role="button" to="/orderHistory"  >
             <img alt="history" class="history" src="https://cdn-icons-png.flaticon.com/512/32/32223.png" width={"20px"}/>
            </Link>
            <Link  role="button" to="#signout"  onClick={signoutHandler}>
              <button className="btn btn-sm mx-2 btn-secondary">Log out</button>
            </Link>
            </span> : (
             <Link to="/signin" className="text-decoration-none text-white">Sign in </Link>
              )}
{/*             
            </Link> */}
          
       
          </div>
        </div>
      </div>
    </nav>
  );
}
