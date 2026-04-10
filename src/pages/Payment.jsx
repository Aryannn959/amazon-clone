import "./Payment.css";
import React, { useEffect, useState } from "react";
import { useStateValue } from "../StateProvider.jsx";
import CheckoutProduct from "../components/CheckoutProduct.jsx";
import { getbasketTotal } from "../reducer.js";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { NumericFormat } from "react-number-format";
import axios from "../axios.js";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase.js";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  // 🔥 Fetch client secret
  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const response = await axios.post(
          `/payments/create?total=${getbasketTotal(basket) * 100}`,
        );

        if (response?.data?.clientSecret) {
          console.log("SETTING CLIENT SECRET:", response.data.clientSecret);
          setClientSecret(response.data.clientSecret);
        }
      } catch (err) {
        console.log("API ERROR:", err.message);
      }
    };

    if (basket.length > 0) {
      getClientSecret();
    }
  }, [basket]);

  // 🔥 Handle payment submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      console.log("Stripe not ready");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.log("Card element missing");
      return;
    }

    setProcessing(true);

    try {
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      console.log("Payload:", payload);

      if (payload.error) {
        setError(`Payment failed: ${payload.error.message}`);
        setProcessing(false);
      } else {
        const paymentIntent = payload.paymentIntent;

        console.log("🔥 Payment successful, saving to Firestore...");

        try {
          await setDoc(doc(db, "users", user.uid, "orders", paymentIntent.id), {
            basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

          console.log("✅ Saved to Firestore");
        } catch (err) {
          console.log("❌ Firestore error:", err);
        }

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({ type: "EMPTY_BASKET" });

        navigate("/orders", { replace: true });
      }
    } catch (err) {
      console.log("Stripe Error:", err);
      setProcessing(false);
    }
  };

  // 🔥 Card input change
  const handleChange = (e) => {
    setDisabled(e.empty || e.error);
    setError(e.error ? e.error.message : "");
  };

  console.log("Client Secret:", clientSecret);

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        {/* Address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user ? user.email : "Guest"}</p>
            <p>React Lane</p>
            <p>California</p>
          </div>
        </div>

        {/* Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items And Delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item, index) => (
              <CheckoutProduct
                key={`${item.id}-${index}`}
                id={item.id}
                title={item.title}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        </div>

        {/* Payment */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>

          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <NumericFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getbasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />

                <button
                  disabled={
                    !clientSecret || processing || disabled || succeeded
                  }
                >
                  <span>{processing ? "Processing..." : "Buy Now"}</span>
                </button>
              </div>

              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
