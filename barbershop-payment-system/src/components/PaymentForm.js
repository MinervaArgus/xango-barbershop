import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { Container } from "react-bootstrap";
import { db } from "../firebase.js";
import { collection, addDoc } from "firebase/firestore"

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" }
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee"
    }
  }
}

export default function PaymentForm(props) {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)
  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    })
    if (!error) {
      try {
        const { id } = paymentMethod
        console.log("log stripe id: " + id);
        const response = await axios.post("http://35.180.115.132:4000/api/payment", {
          amount: props.appointment.price * 100,
          id
        })
        if (response.data.success) {
          console.log("Succesful payment")
          completeAppointment()
          setSuccess(true)
        } else {
          setError(response.data.message || "Payment failed")
        }
      } catch (error) {
        console.log("Error: ", error);
        setError(error.message || "Payment failed")
      }
    } else {
      console.log("Error: " + error.message);
      setError(error.message || "Payment failed")
    }
  }

  const completeAppointment = async () => {
    try {
      await addDoc(collection(db, 'appointments'), {
        name: props.appointment.name,
        email: props.appointment.email,
        haircut: props.appointment.haircut,
        date: props.date,
        time: props.time,
        price: props.appointment.price,
        paymentType: props.appointment.paymentType,
        paid: props.appointment.paid,
        appointmentID: props.id
      })
      await axios.post('http://35.180.115.132:4000/api/mail', {
        customerName: props.appointment.name,
        to: props.appointment.email,
        subject: "Appointment confirmation",
        price: props.appointment.price + "€",
        service: props.appointment.haircut,
        date: props.date,
        time: props.time,
        appointmentID: props.id
      });
      console.log("Email sent")
    } catch (e) {
      console.log(e.response.data);
      setError(e.response.data.message || "Failed to complete appointment")
    }
  }

  // added appointment details after successful payment 
  // alerts the user about their email confirmation 
  return (
    <>
      {!success ? (
        <Container className="my-3">
          <form onSubmit={handleSubmit}>
            <h1>Please introduce your Card details:</h1>
            <fieldset className="FormGroup">
              <div className="FormRow">
                <CardElement options={CARD_OPTIONS} />
              </div>
            </fieldset>
            <button>Pay</button>
          </form>
        </Container>
      ) : (
        <Container>
          <h2>You just paid: </h2>
          <p>{props.appointment.price}€</p>


          <p>Appointment details:</p>
          <ul>
            <li>Name: {props.appointment.name}</li>
            <li>Email: {props.appointment.email}</li>
            <li>Haircut: {props.appointment.haircut}</li>
            <li>Date: {props.date}</li>
            <li>Time: {props.time}</li>
            <li>Price: {props.appointment.price}€</li>
          </ul>
          <p>An email confirmation has been sent to {props.appointment.email}.</p>
        </Container>
      )}
    </>
  );

}
