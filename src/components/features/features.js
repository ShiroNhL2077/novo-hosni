import React from "react";
import "./features.css";
export default function Features() {
  return (
    <div className="categ">
      <p className="text-light display-1 text-center">FEATURES</p>
      <div id="carouselExampleInterval" class="carousel slide carousel-fade">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide-to="4"
            aria-label="Slide 5"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide-to="5"
            aria-label="Slide 6"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide-to="6"
            aria-label="Slide 7"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide-to="7"
            aria-label="Slide 8"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="1000">
            <img
              src="./imgs/carousel/carousel-1.jpg"
              className="d-block c-img"
              alt="..."
            />
          </div>
          <div className="carousel-item" data-bs-interval="1000">
            <img
              src="./imgs/carousel/carousel-2.jpg"
              className="d-block c-img"
              alt="..."
            />
          </div>
          <div className="carousel-item" data-bs-interval="1000">
            <img
              src="./imgs/carousel/carousel-3.jpg"
              className="d-block c-img"
              alt="..."
            />
          </div>
          <div className="carousel-item" data-bs-interval="1000">
            <img
              src="./imgs/carousel/carousel-4.jpg"
              className="d-block c-img"
              alt="..."
            />
          </div>
          <div className="carousel-item" data-bs-interval="1000">
            <img
              src="./imgs/carousel/carousel-5.jpg"
              className="d-block c-img"
              alt="..."
            />
          </div>
          <div className="carousel-item" data-bs-interval="1000">
            <img
              src="./imgs/carousel/carousel-6.jpg"
              className="d-block c-img"
              alt="..."
            />
          </div>
          <div className="carousel-item" data-bs-interval="1000">
            <img
              src="./imgs/carousel/carousel-7.jpg"
              className="d-block c-img"
              alt="..."
            />
          </div>
          <div className="carousel-item" data-bs-interval="1000">
            <img
              src="./imgs/carousel/carousel-8.jpg"
              className="d-block c-img"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
