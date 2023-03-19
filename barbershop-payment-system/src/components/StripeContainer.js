import React from 'react'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from './PaymentForm'

const PUBLIC_KEY = "pk_test_51MnMqeF9fZJLHqXPYatFGEifDvMggepCvd0eQBqKeONsMIp3DRbCZkscegfCCnTD1ty9cwWSOvX7jMohSh3Hj22k00hZ3KvGrq"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer(props) {
    console.log("loglog: " + props.appointment.time);
    return (
        <Elements stripe={stripeTestPromise}>
            <PaymentForm
                appointment={props.appointment}
                date={props.date}
                time={props.time}
                id={props.id} />
        </Elements>
    )
}