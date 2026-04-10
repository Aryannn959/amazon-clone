# 🛒 Amazon Clone (Full-Stack)
https://amazon-clone-21bb.vercel.app
A full-stack Amazon clone built using **React, Firebase, and Stripe**, allowing users to browse products, manage a cart, and make secure payments.

---

## 🚀 Features

* 🔐 User Authentication (Login / Signup)
* 🛍️ Add to Cart / Remove from Cart
* 💳 Secure Payments with Stripe
* 📦 Order Storage in Firestore
* 🔄 Real-time Order Updates
* 🌐 Responsive UI

---

## 🧠 Tech Stack

### Frontend

* React.js
* Context API (State Management)
* React Router

### Backend

* Firebase Cloud Functions (Express)
* Stripe API

### Database & Auth

* Firebase Authentication
* Firestore (NoSQL Database)

---

##  Application Flow

```text
User logs in
   ↓
Browse products
   ↓
Add items to cart
   ↓
Checkout page
   ↓
Frontend calls backend (/payments/create)
   ↓
Backend creates Stripe PaymentIntent
   ↓
Returns clientSecret
   ↓
Frontend confirms payment
   ↓
Order stored in Firestore
   ↓
User redirected to Orders page
```

---

##  Payment Flow (Stripe)

* Backend creates a **PaymentIntent**
* Returns a **clientSecret**
* Frontend uses `confirmCardPayment` to complete transaction
* On success:

  * Order is saved in Firestore
  * Basket is cleared

---

## 🗄️ Firestore Structure

```text
users
 └── userId
      └── orders
           └── orderId
                ├── basket
                ├── amount
                └── created
```

---

##  Installation

```bash
git clone https://github.com/Aryannn959/amazon-clone.git
cd amazon-clone
npm install
```

---

## ▶ Run Project

### Frontend

```bash
npm start
```

### Backend (Firebase Functions)

```bash
cd functions
npm install
firebase emulators:start
```

---



##  Key Concepts Used

* Context API + Reducer for global state
* Firebase Auth session persistence
* Stripe PaymentIntent & clientSecret
* Real-time updates using Firestore `onSnapshot`
* Separation of concerns using reusable components



##  Improvements (Future Scope)

* Add product API instead of static data
* Implement order tracking system
* Add better UI/UX and animations
* Improve backend validation
* Add testing (Jest / Cypress)




