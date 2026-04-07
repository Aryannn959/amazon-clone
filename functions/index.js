const functions = require("firebase-functions");

const logger = require("firebase-functions/logger");
const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

//  App config
const app = express();
const cors = require("cors");

//  Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//  API Routes
app.get("/", (request, response) => response.status(200).send("Hello World"));
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment request received - ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

//  Listen Command

//  Listen Command

exports.api = functions.https.onRequest(app);
//http://127.0.0.1:5001/challenge-7a19a/us-central1/api/aryan
