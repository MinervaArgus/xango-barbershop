import React from 'react'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from './PaymentForm'

const PUBLIC_KEY = "pk_test_51MnMqeF9fZJLHqXPYatFGEifDvMggepCvd0eQBqKeONsMIp3DRbCZkscegfCCnTD1ty9cwWSOvX7jMohSh3Hj22k00hZ3KvGrq"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer(props) {

    let paymentForm;
    if (props.appointment) {
        console.log("inside appointments");
        paymentForm = <><PaymentForm
            appointment={props.appointment}
            date={props.date}
            time={props.time}
            id={props.id} /></>
    } else if (props.products) {
        console.log("inside products");
        paymentForm = <><PaymentForm
            products={props.products} /></>
    } else {
        console.log("inside error");
        paymentForm = <h3>An error ocurred, please try later</h3>
    }
    return (
        <Elements stripe={stripeTestPromise}>
            <>{paymentForm}</>
        </Elements>
    )
}