import React, { useEffect, useReducer } from "react";
import "./categories.css";
import { Link } from "react-router-dom";
import { getError } from "../../utils/utils";
import axios from "axios";
import logger from "use-reducer-logger";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper";

export default function Categories() {
  
 const reducer = (state, action) => {
   switch (action.type) {
     case "FETCH_REQUEST":
       return { ...state, loading: true };
     case "FETCH_SUCCESS":
       return { ...state, products: action.payload, loading: false };
     case "FETCH_FAIL":
       return { ...state, loading: false, error: action.payload };

     default:
       return state;
   }
 };
 // const [products,setProducts] = useState([]);
 const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
   products: [],
   loading: true,
   error: "",
 });
 useEffect(() => {
   const fetchData = async () => {
     dispatch({ type: "FETCH_REQUEST" });
     try {
       const result = await axios.get("http://localhost:5000/api/products");
       dispatch({ type: "FETCH_SUCCESS", payload: result.data.products });
     } catch (error) {
       dispatch({ type: "FETCH_FAIL", payload: getError(error) });
     }
     // setProducts(result.data)
   };
   fetchData();
 }, []);
  
  // function changeBg() {
  //   const images = products.map(p => p.image);
  
  //   const cont = document.getElementById("bg");
  //   const bg = images[Math.floor(Math.random() * images.length)];
  //   cont.style.backgroundImage = bg;
  // }

  // setInterval(changeBg, 5000);
  return (
    // added border radius
    <div className="album w-100 round-b mb-5" id="categories">
      <div className="d-flex flex-column flex-wrap justify-content-center align-items-center">
        <div className="mb-3 w-50 card-container d-flex justify-content-center">
          <div className="s-container">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              className="mySwiper"
            >
              {products.map((p) => (
                <SwiperSlide key={p.slug}>
                  <Link to={`/product/${p.slug}`}>
                    <img src={p.image} width={"300px"} />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="dec-none d-flex flex-column align-items-center">
            <h3 className="cardTitle fw-normal text-light m-0">B 600</h3>
            <span className="text-light fw-light opacity-75 fs-4 mt-1">
              Recharge
            </span>
            <button className="btn btn-primary"></button>
          </div>
        </div>
      </div>
    </div>
  );
}
