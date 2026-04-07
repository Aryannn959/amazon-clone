
import "./Subtotal.css"
import { NumericFormat } from "react-number-format";

import { useStateValue } from '../StateProvider.jsx';
import { getbasketTotal } from "../reducer.js";
import{useNavigate} from "react-router-dom";

function Subtotal() {
    const [{basket},dispatch]=useStateValue();
    const navigate=useNavigate();
  return (
    <div className='subtotal'>
        <NumericFormat
            renderText={(value)=>(
                <>
                <p>
                    Subtotal({basket.length} items):
                    <strong>{value} </strong>
                </p>
                <small className="subtotal__gift">
                    <input type="checkbox" />This order contains a gift
                </small>
                </>
            )}    
            decimalScale={2}
            value={getbasketTotal(basket)}    
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}

        />
        <button onClick={e=>navigate('/payment')}>Proceed To Checkout</button>
        
      
    </div>
  )
}

export default Subtotal
