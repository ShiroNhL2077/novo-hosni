import React from 'react'
import './categories.css'
import { Link } from 'react-router-dom'

export default function Categories() {
  return (
    // added border radius
    <div className="album w-100 round-b mb-5" id="categories">
      <div className="d-flex flex-column flex-wrap justify-content-center">
        <div className="mb-3 row row-cols-md-2 row-cols-1 g-5 card-container">
          <Link
            to="/flavors"
            className="shadow categ text-decoration-none col card-1 cards d-flex flex-column align-items-center pt-5 mb-4"
          >
            <div className="dec-none d-flex flex-column align-items-center">
              <h3 className="cardTitle fw-normal text-light m-0">B 600</h3>
              <span className="text-light fw-light opacity-75 fs-4 mt-1">
                Recharge
              </span>
            </div>
          </Link>
          <Link
            to="/flavors"
            className="text-decoration-none col categ card-2 cards d-flex flex-column align-items-center pt-5 mb-4"
          >
            <div className="dec-none d-flex flex-column align-items-center">
              <h3 className="cardTitle fw-normal text-light m-0">ETO</h3>
              <span className="text-light fw-light opacity-75 fs-4 mt-1">
                6500
              </span>
            </div>
          </Link>
          <Link
            to="/flavors"
            className="categ mx-auto text-decoration-none col card-3 cards d-flex flex-column align-items-center pt-5"
          >
            <div className="dec-none d-flex flex-column align-items-center">
              <h3 className="cardTitle fw-normal text-light m-0">N-BOX</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
