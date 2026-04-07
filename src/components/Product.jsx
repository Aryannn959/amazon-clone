import React from 'react'
import "./Product.css"
import { useStateValue } from '../StateProvider.jsx'


function Product({ id, title, image, price, rating}) {
  const [state,dispatch]=useStateValue();
  const addtobasket=()=>{
    // dispatch the item to data layer
    dispatch({
      type:'ADD_TO_BASKET',
      item: {
      id,
      title,
      image,
      price, }
    });

  };
  return (
    
    <div className='product'>
        <div className='product__info'>
            <p>{title}:</p>
            <p className="product__price"><small>$</small>
                                          <strong>{price}</strong>  
            </p>
            <div className='product__rating'>
                {Array(rating)
                .fill()
                .map((_,i)=>(
                    <p key={i}>⭐</p>

                ))
                
                }               
                
            </div>
        </div>
        <img src={image} alt={title}/>
        <button onClick={addtobasket}>Add To Basket</button>
      
    </div>
  )
}

export default Product
