import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import HomeScreen from "./screens/homeScreen";
import ProductScreen from "./screens/productScreen";
import { useContext } from "react";
import { Store } from "./Store";
import CartScreen from "./screens/CartScreen";
import SignInScreen from "./screens/SignInScreen";
import ShippingAdresseScreen from "./screens/ShippingAdresseScreen";
import SignUpScreen from "./screens/SignUpScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import Completion from "./screens/Completion";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/navbar/navbar";
import './App.css'
import Delivrey from "./screens/delivrey/Delivrey";
import Ordersum from "./screens/orderScreen-/Ordersum";
function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {  cart, userInfo } = state;
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main style={{ paddingTop: "3%" }}>
          <Routes>
            <Route
              exact
              path="/product/:slug"
              element={<ProductScreen />}
            ></Route>
            <Route exact path="/" element={<HomeScreen />}></Route>
            <Route exact path="/cart" element={<CartScreen />}></Route>
            <Route exact path="/signin" element={<SignInScreen />}></Route>
            <Route exact path="/signup" element={<SignUpScreen />}></Route>
            <Route
              exact
              path="/shipping"
              element={<ShippingAdresseScreen />}
            ></Route>
            <Route
              exact
              path="/payment"
              element={<PaymentMethodScreen />}
            ></Route>
            <Route
              exact
              path="/placeOrder"
              element={<PlaceOrderScreen />}
            ></Route>
            <Route path="/order/:id" element={<OrderScreen />}></Route>
            <Route path="/completion" element={<Completion />}></Route>
            <Route
              path="/orderhistory"
              element={
                <ProtectedRoute>
                  <OrderHistoryScreen />
                </ProtectedRoute>
              }
            ></Route>
            <Route exact path="/delivrey" element={<Delivrey />}></Route>
            <Route exact path="/ordersum" element={<Ordersum />}></Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
