import axios from 'axios';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import './Product.css'

export default function Product(props) {
    const { product } = props;
    const {state, dispatch : ctxDispatch} = useContext(Store);
    const {cart : {cartItems},} = state;
    const addToCartHandler = async (item) => {
        const existItem = cartItems.find((x) => x._id === product._id);
  const quantity = existItem ? existItem.quantity + 1 : 1;
        const {data} = await axios.get(`http://127.0.0.1:5000/api/products/${item._id}`) ;
        
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
          }
          ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity },
          });
        }
  return (
  //   <div className="product" key={product.slug}>
  //   <Link to={`/product/${product.slug}`}>
  //    <img  src={product.image} alt={product.name} />
  //    </Link>
  // <div className="product-info">
  // <Link to={`/product/${product.slug}`}>
  // <p>{product.name}</p>
  // </Link>
  //    <p><strong>{product.price}</strong></p>
  //   {product.countInStock === 0 ? <button disabled>Out of stock</button> 
  //    : <button onClick={()=>addToCartHandler(product)}>Add to card</button>}
     
  // </div>
  //  </div>

<div class="-card mx-5 col">
            <div class="imgBx">
            <Link to={`/product/${product.slug}`}>
              <img src={product.image} width={'25px'}  alt={product.name} />
              </Link>
            </div>
            <div class="contentBx">
            <Link to={`/product/${product.slug}`} className="">
              <h2 className='text-yellow'>{product.name}</h2>
              </Link>
              <div class="quantity mb-3">
              </div>
              <div class="price mb-3 d-flex justify-content-center">
                <h3 className='m-0'>€{product.price}</h3></div>
              {product.countInStock === 0 ? <button type="button" disabled className="btn-clear">Out of stock</button> :
              <button onClick={()=>addToCartHandler(product)} type="button" className="btn-clear">
             
                ADD TO CART
            
            </button>
              }
              
            </div>
          </div>
        


//   <main className="py-5">
//   <div className="container text-center">
//     <h2 className="text-light mb-5">15 FLAVORS AVAILABLE</h2>
//     <div className="-container row row-cols-lg-3 px-5 g-5 justify-content-center row-cols-md-2 row-cols-1">
//       <div class="-card mx-5 col">
//         <div class="imgBx">
//           <img src="./imgs/flavors/f-1.png" />
//         </div>
//         <div class="contentBx">
//           <h2 className='text-yellow'>blueberry Rasberry</h2>
//           <div class="quantity mb-3">
//           </div>
//           <div class="price mb-3 d-flex justify-content-center"><h3 className='m-0'>$17.99 USD</h3></div>
//           <button type="button" className="btn-clear">
//             <Link to="/product" className="link-clear">
//               BUY NOW
//             </Link>
//           </button>
//         </div>
//       </div>
//       <div class="-card mx-5 col">
//         <div class="imgBx">
//           <img src="./imgs/flavors/f-2.png" />
//         </div>
//         <div class="contentBx">
//           <h2>Rasberry Grape Sherbet</h2>
//           <div class="quantity mb-3">
//           </div>
//           <div class="price mb-3 d-flex justify-content-center"><h3 className='m-0'>$17.99 USD</h3></div>
//           <button type="button" className="btn-clear">
//             <Link to="/product" className="link-clear">
//               BUY NOW
//             </Link>
//           </button>
//         </div>
//       </div>
//       <div class="-card mx-5 col">
//         <div class="imgBx">
//           <img src="./imgs/flavors/f-3.png" />
//         </div>
//         <div class="contentBx">
//           <h2>Watermelon Ice</h2>
//           <div class="quantity mb-3">
//           </div>
//           <div class="price mb-3 d-flex justify-content-center"><h3 className='m-0'>$17.99 USD</h3></div>
//           <button type="button" className="btn-clear">
//             <Link to="/product" className="link-clear">
//               BUY NOW
//             </Link>
//           </button>
//         </div>
//       </div>
//       <div class="-card mx-5 col">
//         <div class="imgBx">
//           <img src="./imgs/flavors/f-4.png" />
//         </div>
//         <div class="contentBx">
//           <h2>Blueberry ice</h2>
//           <div class="quantity mb-3">
//           </div>
//           <div class="price mb-3 d-flex justify-content-center"><h3 className='m-0'>$17.99 USD</h3></div>
//           <button type="button" className="btn-clear">
//             <Link to="/product" className="link-clear">
//               BUY NOW
//             </Link>
//           </button>
//         </div>
//       </div>
//       <div class="-card mx-5 col">
//         <div class="imgBx">
//           <img src="./imgs/flavors/f-5.png" />
//         </div>
//         <div class="contentBx">
//           <h2>Blueberry Lemon</h2>
//           <div class="quantity mb-3">
//           </div>
//           <div class="price mb-3 d-flex justify-content-center"><h3 className='m-0'>$17.99 USD</h3></div>
//           <button type="button" className="btn-clear">
//             <Link to="/product" className="link-clear">
//               BUY NOW
//             </Link>
//           </button>
//         </div>
//       </div>
//       <div class="-card mx-5 col">
//         <div class="imgBx">
//           <img src="./imgs/flavors/f-6.png" />
//         </div>
//         <div class="contentBx">
//           <h2>Peach Apple</h2>
//           <div class="quantity mb-3">
//           </div>
//           <div class="price mb-3 d-flex justify-content-center"><h3 className='m-0'>$17.99 USD</h3></div>
//           <button type="button" className="btn-clear">
//             <Link to="/product" className="link-clear">
//               BUY NOW
//             </Link>
//           </button>
//         </div>
//       </div>
//       <div class="-card mx-5 col">
//         <div class="imgBx">
//           <img src="./imgs/flavors/f-7.png" />
//         </div>
//         <div class="contentBx">
//           <h2>Strawberry Watermelon</h2>
//           <div class="quantity mb-3">
//           </div>
//           <div class="price mb-3 d-flex justify-content-center"><h3 className='m-0'>$17.99 USD</h3></div>
//           <button type="button" className="btn-clear">
//             <Link to="/product" className="link-clear">
//               BUY NOW
//             </Link>
//           </button>
//         </div>
//       </div>
//       <div class="-card mx-5 col">
//         <div class="imgBx">
//           <img src="./imgs/flavors/f-8.png" />
//         </div>
//         <div class="contentBx">
//           <h2>Raging Bull</h2>
//           <div class="quantity mb-3">
//           </div>
//           <div class="price mb-3 d-flex justify-content-center"><h3 className='m-0'>$17.99 USD</h3></div>
//           <button type="button" className="btn-clear">
//             <Link to="/product" className="link-clear">
//               BUY NOW
//             </Link>
//           </button>
//         </div>
//       </div>
//       <div class="-card mx-5 col">
//         <div class="imgBx">
//           <img src="./imgs/flavors/f-9.png" />
//         </div>
//         <div class="contentBx">
//           <h2>Pink Lemonade</h2>
//           <div class="quantity mb-3">
//           </div>
//           <div class="price mb-3 d-flex justify-content-center"><h3 className='m-0'>$17.99 USD</h3></div>
//           <button type="button" className="btn-clear">
//             <Link to="/product" className="link-clear">
//               BUY NOW
//             </Link>
//           </button>
//         </div>
//       </div>
//       <div class="-card mx-5 col">
//         <div class="imgBx">
//           <img src="./imgs/flavors/f-10.png" />
//         </div>
//         <div class="contentBx">
//           <h2>Peach Pineapple</h2>
//           <div class="quantity mb-3">
//           </div>
//           <div class="price mb-3 d-flex justify-content-center"><h3 className='m-0'>$17.99 USD</h3></div>
//           <button type="button" className="btn-clear">
//             <Link to="/product" className="link-clear">
//               BUY NOW
//             </Link>
//           </button>
//         </div>
//       </div>
//       <div class="-card mx-5 col">
//         <div class="imgBx">
//           <img src="./imgs/flavors/f-11.png" />
//         </div>
//         <div class="contentBx">
//           <h2>Peach Grape</h2>
//           <div class="quantity mb-3">
//           </div>
//           <div class="price mb-3 d-flex justify-content-center"><h3 className='m-0'>$17.99 USD</h3></div>
//           <button type="button" className="btn-clear">
//             <Link to="/product" className="link-clear">
//               BUY NOW
//             </Link>
//           </button>
//         </div>
//       </div>
//       <div class="-card mx-5 col">
//         <div class="imgBx">
//           <img src="./imgs/flavors/f-12.png" />
//         </div>
//         <div class="contentBx">
//           <h2>Cherry Lemon Peach</h2>
//           <div class="quantity mb-3">
//           </div>
//           <div class="price mb-3 d-flex justify-content-center"><h3 className='m-0'>$17.99 USD</h3></div>
//           <button type="button" className="btn-clear">
//             <Link to="/product" className="link-clear">
//               BUY NOW
//             </Link>
//           </button>
//         </div>
//       </div>
//       <div class="-card mx-5 col">
//         <div class="imgBx">
//           <img src="./imgs/flavors/f-13.png" />
//         </div>
//         <div class="contentBx">
//           <h2>Mixed Berries</h2>
//           <div class="quantity mb-3">
//           </div>
//           <div class="price mb-3 d-flex justify-content-center"><h3 className='m-0'>$17.99 USD</h3></div>
//           <button type="button" className="btn-clear">
//             <Link to="/product" className="link-clear">
//               BUY NOW
//             </Link>
//           </button>
//         </div>
//       </div>
//       <div class="-card mx-5 col">
//         <div class="imgBx">
//           <img src="./imgs/flavors/f-14.png" />
//         </div>
//         <div class="contentBx">
//           <h2>Blueberry Blasting</h2>
//           <div class="quantity mb-3">
//           </div>
//           <div class="price mb-3 d-flex justify-content-center"><h3 className='m-0'>$17.99 USD</h3></div>
//           <button type="button" className="btn-clear">
//             <Link to="/product" className="link-clear">
//               BUY NOW
//             </Link>
//           </button>
//         </div>
//       </div>
//       <div class="-card mx-5 col">
//         <div class="imgBx">
//           <img src="./imgs/flavors/f-15.png" />
//         </div>
//         <div class="contentBx">
//           <h2>Vanilla Strawberry</h2>
//           <div class="quantity mb-3">
//           </div>
//           <div class="price mb-3 d-flex justify-content-center"><h3 className='m-0'>$17.99 USD</h3></div>
//           <button type="button" className="btn-clear">
//             <Link to="/product" className="link-clear">
//               BUY NOW
//             </Link>
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// </main>

  )
}
