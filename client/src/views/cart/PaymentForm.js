import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { 
    CardElement, 
    useElements, 
    useStripe 
} from '@stripe/react-stripe-js'
import axios from 'axios'
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
    const [billingDetails, setBillingDetails] = useState({
      email: "test@gmail.com",
      phone: "000000000",
      name: "John Doe"
    });
    const submitPayment = async (paymentMethod)=>{
        try {
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
        } catch (error) {
            console.log("Error", error)
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
        if (error) {
            elements.getElement("card").focus();
            return;
        }
        if (cardComplete) {
            setProcessing(true);
        }
        setProcessing(false);
        if (payload.error) {
            setError(payload.error);
        } 
        else {
            submitPayment(payload.paymentMethod);
        }
    };
    return (
        <form className="Form" onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
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
            </fieldset>
            <fieldset className="FormGroup">
                <CardField
                onChange={(e) => {
                    setError(e.error);
                    setCardComplete(e.complete);
                }}
                />
            </fieldset>
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
            <SubmitButton processing={processing} error={error} disabled={!stripe}>
                Pay $25
            </SubmitButton>
        </form>
    );
}


// return (
//     <>
//         {!paymentMethod ?
//             <form onSubmit={handleSubmit}>
//                 <fieldset className="FormGroup">
//                     <div className="FormRow">
//                         <CardElement options={CARD_OPTIONS} />
//                     </div>
//                 </fieldset>
//                 <button id="pay-button">Pay</button>
//             </form>
//             :
//             <div>
//                 <h2>You just made the decision to be healthy and fit!</h2>
//             </div>
//         }
//     </>
// )

// if (!error) {
//     try {
//         const { id } = payload;
//         console.log('https://StripeServer.jayaramnair.repl.co/payment')
//         const response = await axios.post("https://StripeServer.jayaramnair.repl.co/payment", {
//             amount: 1000,
//             id
//         })

//         if (response.data.success) {
//             console.log("Successful Payment")
//             setSuccess(true)
//         }
//     } catch (error) {
//         console.log("Error", error)
//     }
// } else {
//     console.log(error.message);
//     setError(error);
// }
// }
