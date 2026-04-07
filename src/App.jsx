import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from "./pages/Checkout.jsx";

import Login from "./pages/Login.jsx";

import Home from "./pages/Home.jsx";
import { auth } from "./firebase.js";
import { useStateValue } from "./StateProvider.jsx";
import Payment from "./pages/Payment.jsx";
import Orders from "./pages/Orders.jsx";

function App() {
  const promise = loadStripe(
    "pk_test_51RuYQTLbF17wuwuUs3EC6YTiIcLWt4pJUrCIdlMYBIWG5m2qTc0ngmGaL7DnaOc4JwCm8cuEe4l75nFaOMsMQA7K00duaN3hik",
  );
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    //will only run once when the app component loads
    auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        //user just logged in or user was logged in
        dispatch({
          type: "SET_USER", // ✅ fixed space issue
          user: authUser,
        });
      } else {
        //the user is logged out
        dispatch({
          type: "SET_USER", // ✅ fixed space issue
          user: null,
        });
      }
    });
  }, []);
  return (
    //BEM
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path="/payment"
            element={
              <>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </>
            }
          />
          <Route
            path="/orders"
            element={
              <>
                <Header />
                <Orders />
              </>
            }
          />

          <Route
            path="/checkout"
            element={
              <>
                <Header />
                <Checkout />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
