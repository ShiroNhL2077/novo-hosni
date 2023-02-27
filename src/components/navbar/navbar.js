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
    <nav className="navbar bg-dark navbar-expand-lg top-nav">
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="/">
          <img
            src="./vapyvape.png"
            width={"70px"}
            className="mx-3"
            alt="logo"
          />
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
          <ul className="navbar-nav mb-2 mb-lg-0 w-75 justify-content-center">
            <li class="nav-item">
              <a class="nav-link me-md-5" aria-current="page" href="#">
                UNSERE MARKE
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link me-md-5" href="#">
                PRODUKTE
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-uppercase" href="#">
                unterstützen
              </a>
            </li>
          </ul>
          <div className="d-flex flex-nowrap align-items-center">
            <div className="search">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#fff"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
            {/* <Link to="/profile" role="button" className="text-decoration-none"> */}

            {userInfo ? (
              <span class="dropdown-center">
                <button
                  class="btn btn-dark dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="text-light mx-2">{userInfo.name}</span>
                </button>
                <ul class="dropdown-menu dropdown-menu-dark">
                  <li>
                    <Link role="button" to="/orderHistory">
                      <img
                        alt="history"
                        class="history"
                        src="https://cdn-icons-png.flaticon.com/512/32/32223.png"
                        width={"20px"}
                      />
                    </Link>
                  </li>
                  <li>
                    <Link role="button" to="#signout" onClick={signoutHandler}>
                      <button className="btn btn-sm mx-2 btn-secondary">
                        Log out
                      </button>
                    </Link>
                  </li>
                </ul>
              </span>
            ) : (
              <Link to="/signin" className="text-decoration-none text-white">
                Sign in{" "}
              </Link>
            )}
            {/*             
            </Link> */}
            <Link
              to="/cart"
              role="button"
              className="text-decoration-none cart w-25"
            >
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

              <span className="text-light me-3 ">
                {" "}
                {cart.cartItems.length > 0 && (
                  <span>
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </span>
                )}
              </span>
            </Link>
            <select className="form-select bg-dark text-light border-none text-center" aria-label="Translate-btn">
              <option value="de" selected>De</option>
              <option value="en">En</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
}
