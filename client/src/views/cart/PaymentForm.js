import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { 
    CardElement, 
    useElements, 
    useStripe 
} from '@stripe/react-stripe-js';
import axios from 'axios';
import {
    CardField,
    Field,
    SubmitButton,
    ErrorMessage,
} from './paymentForm/formComponents';

export default function PaymentForm() {
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [cardComplete, setCardComplete] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [paymentMsg, setPaymentMsg] = useState('');
    const [billingDetails, setBillingDetails] = useState({
        // ****The initial values are not empty for testing*****
      email: "test@gmail.com",
      phone: "000000000",
      name: "John Doe"
    });
    const submitPayment = async (paymentMethod)=>{
        try {
            setProcessing(true);
            const { id } = paymentMethod;
            console.log('https://StripeServer.jayaramnair.repl.co/payment')
            const response = await axios.post("https://StripeServer.jayaramnair.repl.co/payment", {
                amount: 1000,
                id
            })
            
            if (response.data.success) {
                console.log("Successful Payment");
                history.push('/checkout/success');
            }
            else{
                setPaymentMsg(response.data.message);
            }
            setProcessing(false);
        } catch (error) {
            console.log("Error", error);
            setProcessing(false);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            // billing_details is not included because the backend does not take that data yet.
            // billing_details: billingDetails
        })
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }
        if (error || !cardComplete) {
            // if errors are found, set the card on focus
            elements.getElement("card").focus();
            return;
        }
        if (payload.error) {
            // if there is an error in payload
            setError(payload.error);
            return;
        } 
        submitPayment(payload.paymentMethod);
        
    };
    return (
        <form className="FormGroup" onSubmit={handleSubmit}>
            <Field
            label="Name"
            id="name"
            type="text"
            placeholder="Jane Doe"
            required
            autoComplete="name"
            value={billingDetails.name}
            onChange={(e) => {
                setBillingDetails({ ...billingDetails, name: e.target.value });
            }}
            />
            <Field
            label="Email"
            id="email"
            type="email"
            placeholder="janedoe@gmail.com"
            required
            autoComplete="email"
            value={billingDetails.email}
            onChange={(e) => {
                setBillingDetails({ ...billingDetails, email: e.target.value });
            }}
            />
            <Field
            label="Phone"
            id="phone"
            type="tel"
            placeholder="(941) 555-0123"
            required
            autoComplete="tel"
            value={billingDetails.phone}
            onChange={(e) => {
                setBillingDetails({ ...billingDetails, phone: e.target.value });
            }}
            />
            <CardField
            onChange={(e) => {
                setError(e.error);
                setCardComplete(e.complete);
            }}
            />
            <div style={{fontSize:'2rem',color:'red'}}>
                {paymentMsg}
            </div>
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
            <SubmitButton processing={processing} error={error} disabled={!stripe}>
                Pay $25
            </SubmitButton>
        </form>
    );
}