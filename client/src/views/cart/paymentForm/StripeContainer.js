import React from 'react'
import PaymentForm from "./PaymentForm"

import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

const PUBLIC_KEY = "pk_test_51IvfSYGslm331DBRwH79Kft8JPhWj2NNqSCuwbmUibak8zqvHwSkhathpDaFHkxOpEHknORL5918xkxQq2n5KB0Z00UxtbRJzQ"


const stripeTestPromise = loadStripe(PUBLIC_KEY)
export default function StripeContainer() {
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm />
        </Elements>
    )
}
