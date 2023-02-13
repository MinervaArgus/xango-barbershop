import React from 'react'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from './PaymentForm'

const PUBLIC_KEY = "pk_test_51LAt1FJmzVm4CREExKZNSPhK6Txhtme1mJPLZYjXRClRn4kKSoIrxaorc1ADN8VT0EIz0EIQCLalo2uYk0mHzHXd00kzzPo1Bg"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer(props) {

    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm amount={props.amount} />
        </Elements>
    )
}