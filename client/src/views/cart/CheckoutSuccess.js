import React from 'react';
import { Link } from 'react-router-dom';
const CheckoutSuccess=()=>{
    return(
        <div
            className={"d-flex flex-column justify-content-center"}
            style={{
            textAlign: "center",
            border: "1px solid black",
            padding: "8vh 10vw",
            borderRadius: "50px",
            boxShadow: "0 0 1vh white",
            marginBottom: "10vh",
            backgroundColor: '#eee',
            color: 'black',
            minWidth: '375px'
            }}
        >
            <div style={{fontSize:'2rem',color:'green'}}>Your payment was successful.</div> 
            <div style={{fontSize:'2rem'}}>Thank you for your bussiness.</div>
            <Link to='/classes'>
                {/* in the future, this will link to something like '/myclasses' */}
                <button
                    style={{
                        borderRadius: "50px",
                        color: "white",
                        padding: "1.5vh 50px",
                        backgroundColor: "#444",
                        fontSize: "1.5rem",
                        margin: "2vh 0",
                        }}
                >
                    Go to my classes
                </button>
            </Link>
        </div>
    );
};
export default CheckoutSuccess;