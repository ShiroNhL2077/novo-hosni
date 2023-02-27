import React from 'react'
import './footer.css'

export default function Footer() {
  return (
    <footer>
      <div className="shop-now w-100 text-center text-light p-5">
        <div className="d-flex flex-column justify-content-between h-100">
          <p className="display-1">B 600</p>
          <p className='text-uppercase'>
            Shop Now{" "}
            <span className='arrow'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                />
              </svg>
            </span>
          </p>
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
