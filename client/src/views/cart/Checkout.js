import React from 'react';
import StripeContainer from './StripeContainer';
const style={
    // border:'1px solid red',
    width:'60%',
    // height:'100px'
};
const Checkout=()=>{
    return(
        <div style={style}>
            <StripeContainer />
        </div>
    );
};
export default Checkout;