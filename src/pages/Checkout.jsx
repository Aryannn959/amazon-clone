import React from 'react';
import "./Checkout.css";
import Subtotal from '../components/Subtotal.jsx';
import { useStateValue } from '../StateProvider.jsx';
import CheckoutProduct from '../components/CheckoutProduct.jsx';

function Checkout() {
    const [{basket, user },dispatch]=useStateValue();
    
  return (
    <div className='checkout'>
        <div className='checkout__left'>
            <img className='checkout__ad' src="https://images-eu.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"/>
        
        <div >
            <h3>Hello {user ? user.email : " Guest"}</h3>
            <h2 className='checkout__title'>
                Your Shopping Basket
            </h2>
            
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
        <div className='checkout__right'>
            
            <Subtotal/>
            
        </div>
      
    </div>
  )
}

export default Checkout
