import CartItem from './CartItem';
import {useHistory} from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import {connectToStore} from '../../state/interfaces/cartInterface';
import axios from 'axios';
require('dotenv').config();


const Cart=(props)=>{
    // states: classes, user
    const {classes, myClasses} = props;
    // actions: payForClass(indivClass), undoSignUp(indivClass)
    const {undoSignUp} = props;
// payForClass
    const cartList = Object.keys(myClasses).filter((key)=>!myClasses[key].isPaid).map((key)=>classes[key]);
    // const cartList = [];

    // This state will be refactored into redux store
    // pull this from redux
    // history object
    const history = useHistory();

    const handleClickShopping=()=>{
        // click event of the continue shopping button
        history.push('/classes');
    };

    const deleteCartItem=(class_name)=>{
        undoSignUp(cartList.find((c)=>c.class_name===class_name));
    };

    const displayCartItems=(cartList)=>{
        if(cartList.length===0){
            return <div>Your cart is empty</div>;
        }
        else{
            return cartList.map((c,i)=><CartItem key={i} indivClass={c} deleteCartItem={deleteCartItem}></CartItem>);
        }
    };
    const makePayment = (token) => {
        // dummy data for testing
        const fitnessClass = {
            "id": 5,
            "class_name": "Trip to Nirvana",
            "class_type": "yoga + jazzersize",
            "class_date": "Saturday",
            "start_time": "7:00 am",
            "duration": 1,
            "intensity": "low",
            "location": "park",
            "number_of_students": 1,
            "max_class_size": 40,
            "instructor_id": 2
          }
        const body = {
            token,
            product: fitnessClass,
          }
          const headers = {
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoyLCJlbWFpbCI6ImJwQG1hcnZlbC5vcmciLCJpc19pbnN0cnVjdG9yIjp0cnVlLCJpYXQiOjE2MjIxMDY3MDAsImV4cCI6MTYyMjE5MzEwMH0.4TFdT6AGFe2rqunM30z7u0e5Kbps0qIwqxtPR5jAaZY',
          }
          return axios.create({headers}).post(`http://localhost:3000/payment`, body)
          .then(response => {
            console.log("RESPONSE ", response)
            const { status } = response;
            console.log("STATUS", status)
          })
          .catch((err) => {
            console.log(err.stack)
          })
    }
    return (
    <div>
        <h1>Cart</h1>

        {displayCartItems(cartList)}
        
        <button onClick={handleClickShopping}>Continue shopping</button>

            {/*Stripe Secret Key needs to be stored in the .env file on the backend*/}
            {/*Stripe Publishable Key needs to be stored in the .env file on the frontend - REACT_APP_KEY  environment variable stored on FE */}
            {/*react-stripe-checkout package */}
            {/*stripeKey prop will store the publishable key as process.env.REACT_APP_KEY*/}
            <StripeCheckout stripeKey={process.env.REACT_APP_KEY} token={makePayment} name={'Anywhere Fitness Checkout'} amount={10.99 * 100}>
                <button id='cart-checkout-button' disabled={cartList.length===0}>Checkout</button>
            </StripeCheckout>
    </div>
    );
};
export default connectToStore(Cart);
