import CartItem from './CartItem';
import {useHistory} from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import {connectToStore} from '../../state/interfaces/cartInterface';

const Cart=(props)=>{
    // states: classes, user
    const {classes, myClasses} = props;
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
