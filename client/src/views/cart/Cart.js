import React,{useEffect, useState} from 'react';
import CartItem from './CartItem';
import {useHistory} from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import {connectToStore} from '../../state/interfaces/cartInterface';
// data needed
// - client id
// 

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
// fetch client fitness classes from backend by id
// expected class format: 
const exampleData={
    class_date: "Monday",
    class_id: 1,
    class_name: "oldie but goldies",
    class_type: "jazzersize",
    client_id: 3,
    duration: 1,
    email: "th@marvel.org",
    intensity: "high",
    max_class_size: 23,
    number_of_students: 1,
    start_time: "9:00 am"
};

const Cart=(props)=>{
    // states: classes, user
    const {classes, myClasses, user} = props;
    // actions: payForClass(indivClass), undoSignUp(indivClass)
    const {payForClass, undoSignUp} = props;

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
    const makePayment = () => {

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
export default connectToStore(Cart);
