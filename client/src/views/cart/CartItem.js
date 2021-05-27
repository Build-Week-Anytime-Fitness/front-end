import React from 'react';

const CartItem =(props)=>{

    const {class_name,class_date} = props.indivClass;
    const {deleteCartItem} = props;
    const handleClick=()=>{
        deleteCartItem(class_name);
    };
    
    return (
        <div>
            <div>{class_name}</div>
            <div>{class_date}</div>
            <button onClick={handleClick}>remove</button>
        </div>
    );
};
export default CartItem;