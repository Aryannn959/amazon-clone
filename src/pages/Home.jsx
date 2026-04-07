import React from 'react'
import './Home.css'
import Product from '../components/Product.jsx'

function Home() {
  return (
    <div className='home'>
        <div className='home__container'>
            <img className="home__image" src="https://images-eu.ssl-images-amazon.com/images/G/31/IN/Prime/AugART/B/ACQ_Deals-revealed_pc_4._CB804599037_.jpg" alt="image" />

        
        <div className="home__row">
            <Product id="12321341" title='The lean Startup: Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with k-beater, Dough Hook and Whisk, 5 Litre Glass Bowl' 
            price={29.99} 
            image="https://images-eu.ssl-images-amazon.com/images/G/31/img19/Sports/GW_Desktop/1199101_379x304_Compressed._SY304_CB448278349_.jpg"
            rating={3}
            />
            <Product id="49538094" title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with k-beater, Dough Hook and Whisk, 5 Litre Glass Bowl" 
            price={239.0}
            rating={4}
            image="https://images-eu.ssl-images-amazon.com/images/G/31/img19/Sports/GW_Desktop/1199101_379x304_Compressed._SY304_CB448278349_.jpg"/>
            

        </div>
        <div className="home__row">
            <Product id="4903850" title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor" 
            price={98.99}
            rating={5}
            image="https://images-eu.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"/>

            <Product id="23445930" title="Amazon Echo (3rd Generation)| Smart Speaker with Alexa, Charcoal Fabric" 
            price={199.99}
            rating={5}
            image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"/>

            <Product id="325435" title="New Apple Ipad Pro (12.9 inch, wiFi, 128GB) - Silver (4th Generation)" 
            price={598.99}
            rating={4}
            image="https://images-eu.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX835_.jpg"/>

        </div>
        <div className="home__row">
            <Product id="12345" title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Utra Wide Dual WQHD 5120 x 1440" 
            price={1094.98}
            rating={5}
            image="https://images-eu.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg"/>

        </div>
        </div>
      
    </div>
  )
}

export default Home
