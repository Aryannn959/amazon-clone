import React from "react";
import "./Order.css";
import moment from "moment";

import CheckoutProduct from "../components/CheckoutProduct.jsx";
import { NumericFormat } from "react-number-format";

function Order({ order }) {
  // receive order as a prop
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order__id">
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((item, index) => (
        <CheckoutProduct
          key={`${item.id}-${index}`} // index is defined here
          id={item.id}
          title={item.title}
          price={item.price}
          image={item.image}
          hideButton
        />
      ))}
      <NumericFormat
        renderText={(value) => (
          
            <h3>Order Total: {value}</h3>
           
        )}
        decimalScale={2}
        value={order.data.amount/100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </div>
  );
}

export default Order;
