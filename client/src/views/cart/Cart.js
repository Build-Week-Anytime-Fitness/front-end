import React,{useState} from 'react';
import CartItem from './CartItem';
import {useHistory} from 'react-router-dom';


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

    const handleClickCheckout=()=>{
        // click event of the checkout button
        history.push('/cart/checkout');
    };

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
    return (
    <div>
        <h1>Cart</h1>
        {displayCartItems(cartList)}
        {/* <pre>{JSON.stringify(cartList)}</pre> */}
        <button onClick={handleClickShopping}>Continue shopping</button>
        <button disabled={cartList.length===0} onClick={handleClickCheckout}>Checkout</button>
        <div>delete me when footer is not covering me</div>
        <div>delete me when footer is not covering me</div>
    </div>
    );
};
export default Cart;