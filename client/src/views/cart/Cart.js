import React,{useState} from 'react';
import CartItem from './CartItem';
import {useHistory} from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';


// this is for debugging purpose, please delete when redux is implemented
const exampleList=[
    {
        class_name:'Awesome Class',
        class_date:'01/04/2021'
    },
    {
        class_name:'Fun Fun Class',
        class_date:'12/04/2021'
    },
]

const Cart=()=>{
    // This state will be refactored into redux store
    // pull this from redux
    const [cartList,setCartList] = useState(exampleList);
    // history object
    const history = useHistory();

    const handleClickShopping=()=>{
        // click event of the continue shopping button
        history.push('/classes');
    };

    const deleteCartItem=(class_name)=>{
        // update to redux
        setCartList(cartList.filter((c)=>c.class_name!==class_name));
    };

    const displayCartItems=(cartList)=>{
        if(cartList.length===0){
            return <div>Your cart is empty</div>;
        }
        else{
            return cartList.map((c,i)=><CartItem key={i} indivClass={c} deleteCartItem={deleteCartItem}></CartItem>);
        }
    };
    const makePayment = () => {
        // const body = {
        //   token,
        //   product,
        // }
        // const header = {
        //   'Content-Type': 'application/json',
        // }
        // return fetch(`http://localhost:8282/payment`, {
        //   method: "POST",
        //   headers: header,
        //   body: JSON.stringify(body)
        // }).then(response => {
        //   console.log("RESPONSE ", response)
        //   const { status } = response;
        //   console.log("STATUS", status)
        // })
        //   .catch((err) => {
        //     console.log(err)
        //   })
    }
    const exampleAmount= 10;
    return (
    <div>
        <h1>Cart</h1>

        {displayCartItems(cartList)}

        <button onClick={handleClickShopping}>Continue shopping</button>

        <StripeCheckout stripeKey="" token={makePayment} name="Anywhere Fitness" amount={exampleAmount*1000}>
            <button disabled={cartList.length===0}>{`Checkout Total: $${exampleAmount}`}</button>
        </StripeCheckout>
        
        <div>delete me when footer is not covering me</div>
        <div>delete me when footer is not covering me</div>
    </div>
    );
};
export default Cart;