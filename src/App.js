import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import HomeScreen from "./screens/homeScreen";
import ProductScreen from "./screens/productScreen";
import { useContext } from "react";
import { Store } from "./Store";
import CartScreen from "./screens/CartScreen";
import SignInScreen from "./screens/SignInScreen";
import ShippingAdresseScreen from "./screens/ShippingAdresseScreen";
import SignUpScreen from "./screens/SignUpScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
function App() {
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
    <Router>
    <div className="App">
   <header>
    <Link to="/">Novobar</Link>
    <nav>
      <Link to="/cart">
        Cart 
        {
          cart.cartItems.length > 0 && (
            <span>
              {cart.cartItems.reduce((a,c)=>a+c.quantity,0)}
            </span>
          )
        }
      </Link>
     
      {userInfo  ? (
       <div>
         <h3>{userInfo.name}</h3>
         <ul>
         <li ><Link to="/profile">user profile</Link></li>
         <li ><Link to="/orderHistory">order history</Link></li>
         <li ><Link to="#signout" onClick={signoutHandler}>Logout</Link></li>
         </ul>
       </div>
      ) : (
        <Link to="/signin">Sign in </Link>
      )}
    </nav>
   </header>
   <main>
<Routes>
<Route exact path="/product/:slug" element={<ProductScreen />}></Route>
<Route exact path="/" element={<HomeScreen />}></Route>
<Route exact path="/cart" element={<CartScreen />}></Route>
<Route exact path="/signin" element={<SignInScreen />}></Route>
<Route exact path="/signup" element={<SignUpScreen />}></Route>
<Route exact path="/shipping" element={<ShippingAdresseScreen />}></Route>
<Route exact path="/payment" element={<PaymentMethodScreen />}></Route>

</Routes>

   </main>
    </div>
    </Router>
  );
}

export default App;
