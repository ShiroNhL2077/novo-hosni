import data from "./data";
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
function App() {
  const { state } = useContext(Store);
  const { cart } = state;
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
    </nav>
   </header>
   <main>
<Routes>
<Route exact path="/product/:slug" element={<ProductScreen />}></Route>
<Route exact path="/" element={<HomeScreen />}></Route>
<Route exact path="/cart" element={<CartScreen />}></Route>
<Route exact path="/signin" element={<SignInScreen />}></Route>

</Routes>

   </main>
    </div>
    </Router>
  );
}

export default App;
