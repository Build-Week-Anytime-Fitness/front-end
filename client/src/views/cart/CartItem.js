import React from 'react';

const CartItem =(props)=>{

    const {class_name,class_date} = props.indivClass;
    const {deleteCartItem} = props;
    const handleClick=()=>{
        deleteCartItem(class_name);
    };
    
    return (
        <div className={'d-flex flex-column'} style={{margin: '3vh auto'}}>
            <div><h2>{class_name}</h2></div>
            <div><h5>{class_date}</h5></div>
            <button style={{borderRadius: '50px', color: 'white', backgroundColor: 'red'}} onClick={handleClick}>remove</button>
        </div>
    );
};
export default CartItem;