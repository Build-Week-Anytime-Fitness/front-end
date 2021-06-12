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
            <div><h4>{class_date}</h4></div>
            <button style={{borderRadius: '50px', color: 'white', backgroundColor: 'red', padding: '1vh 100px', margin: '2vh 0'}} onClick={handleClick}>remove</button>
        </div>
    );
};
export default CartItem;