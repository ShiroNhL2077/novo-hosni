import React from 'react'
import './footer.css'

export default function Footer() {
  return (
    <footer>
      <div className="bg-blackich round-t">
        <div className="container">
          <div
            className="py-5 px-5"
            id="contacts"
          >
           
            <div className="col d-flex justify-content-center">
              <div className="text-light d-flex flex-column justify-content-between media-item">
                <h6 className="">FOLLOW US</h6>
                <span className="opacity-75 fw-light d-block">
                  Are you social, releasing new products, or holding an event?
                  Follow us to find out more.
                </span>
                <div className="social-img d-flex justify-content-between w-100">
                  <img src="./imgs/facebook.png" className="img-fluid" alt="" />
                  <img
                    src="./imgs/instagram.png"
                    className="img-fluid"
                    alt=""
                  />
                  <img src="./imgs/youtube.png" className="img-fluid" alt="" />
                  <img src="./imgs/twitter.png" className="img-fluid" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-blackich">
        <div class="container rounded-5 bg-dark py-5">
          <h1 class="text-center text-light mb-5">OUR CERTIFICATES</h1>
          <div class="container w-50">
            <div class="row row-cols-lg-3 row-cols-sm-1 row-cols-md-2 g-5">
              <div class="col">
                <img
                  src="imgs-footer/cert-1.png"
                  class="rounded-3 w-100 cert-img"
                  alt=""
                />
              </div>
              <div class="col">
                <img
                  src="imgs-footer/cert-2.png"
                  class="rounded-3 w-100 cert-img"
                  alt=""
                />
              </div>
              <div class="col">
                <img
                  src="imgs-footer/cert-3.png"
                  class="rounded-3 w-100 cert-img"
                  alt=""
                />
              </div>
              <div class="col">
                <img
                  src="imgs-footer/cert-4.png"
                  class="rounded-3 w-100 cert-img"
                  alt=""
                />
              </div>
              <div class="col">
                <img
                  src="imgs-footer/cert-5.png"
                  class="rounded-3 w-100 cert-img"
                  alt=""
                />
              </div>
              <div class="col">
                <img
                  src="imgs-footer/cert-6.png"
                  class="rounded-3 w-100 cert-img"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-blackich container-fluid">
        <div class="links px-5 container">
          <div class="row f-links row-cols-lg-4 row-cols-sm-2 row-cols-1 g-5 text-light">
            <div class="col">
              <h6>PRODUCTS</h6>
              <ul class="ms-3">
                <li>B 600</li>
              </ul>
            </div>
            <div class="col">
              <h6>COMPLIANCE</h6>
              <ul class="ms-3">
                <li>POWER SHOP</li>
                <li>Distributor</li>
                <li>NEWS&Events</li>
                <li>BLOG</li>
                <li>STORE LOCATOR</li>
              </ul>
            </div>
            <div class="col">
              <h6>SUPPORT</h6>
              <ul class="ms-3">
                <li>WARRANTY</li>
                <li>CONTACT US</li>
                <li>MANUALS&FIRMWARES</li>
                <li>PRODUCTS VERIFICATION</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div class="col">
              <h6>CONTACT US</h6>
              <ul class="ms-3">
                <li>smo@smth.smth</li>
                <li>support@smo.smth</li>
                <li class="opacity-100">Anti-counterfeiting Contact :</li>
                <li>+00 00000000</li>
                <li>novo-bar.com</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-blackich round-b mb-5">
        <div class="desc text-light px-5 container round-b">
          <div class="opacity-50">
            <p>
              Vaporesso e-cigarette devices are intended for use with e-liquids,
              which may contain nicotine. Nicotine is an addictive chemical. Do
              not use with any other substances. Do not get on skin or in eyes.
              Do not drink. Store in original container and keep away from
              children and pets. In case of accidental ingestion, call the
              Poison Control Center at 1-800-222-1222.
            </p>
            <p>
              This product is intended for adult users of nicotine-containing
              products, particularly current smokers or vapers. Underage sale is
              prohibited. Do not use this product if you:
            </p>
            <ul>
              <li>Are under the legal age of purchase</li>
              <li>Are pregnant or breastfeeding</li>
              <li>
                Have heart disease, stomach or duodenal ulcers, liver or kidney
                problems, throat disease, or difficulty breathing due to
                bronchitis, emphysema, or asthma
              </li>
              <li>
                Have an overactive thyroid or pheochromocytoma (a tumor of the
                adrenal gland that can affect blood pressure)
              </li>
              <li>
                Are taking certain medications, such as theophylline,
                ropinirole, or clozapine
              </li>
            </ul>
            <p>
              CALIFORNIA PROPOSITION 65 - Warning: This product can expose you
              to chemicals including formaldehyde and acetaldehyde which known
              to the State of California to cause cancer, and Nicotine, which is
              known to the State of California to cause birth defects or other
              reproductive harm. For more information go to
              <a href="www.P65Warnings.ca.gov" class="desc-link">
                www.P65Warnings.ca.gov
              </a>
            </p>
          </div>
          <p>
            Copyright © 2022 Vaporesso. All rights reserved. Privacy | Terms &
            Conditions | Cookies policy
          </p>
        </div>
      </div>
    </footer>
  );
}
