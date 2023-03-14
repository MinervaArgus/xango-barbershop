import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { Container } from "react-bootstrap";
import { db } from "../Firebase.js";
import { collection, addDoc } from "firebase/firestore"
// import { useHistory } from "react-router-dom";

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
    const stripe = useStripe()
    const elements = useElements()
    // const delay = ms => new Promise(res => setTimeout(res, ms));
    // const history = useHistory();

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
                const response = await axios.post("http://localhost:4000/api/payment", {
                    amount: props.appointment.price * 100,
                    id
                })
                if (response.data.success) {
                    console.log("Succesful payment")
                    completeAppointmet()
                    setSuccess(true)
                    // await delay(5000)
                    // history.push("/home")
                }
            } catch (error) {
                console.log("Error: ", error);
            }
        } else {
            console.log("Error: " + error.message);
        }
    }
    const completeAppointmet = async (e) => {
        try {
            await addDoc(collection(db, 'appointments'), {
                name: props.appointment.name,
                email: props.appointment.email,
                haircut: props.appointment.haircut,
                date: props.date,
                time: props.time,
                price: props.appointment.price,
                paymentType: props.appointment.paymentType,
                paid: props.appointment.paid
            })
            await axios.post('http://localhost:4000/api/mail', {
                customerName: props.appointment.name,
                to: props.appointment.email,
                subject: "Appointment confirmation",
                price: props.appointment.price + "€",
                service: props.appointment.haircut,
                date: props.date,
                time: props.time,
                html: '<strong>Some random html code</strong>'
            });

        } catch (e) {
            console.log(e.response.data);
        }
    }
    return (
        <>
            {!success ?
                // <<<<<<< Updated upstream
                /* =======
                    <Form onSubmit={handleSubmit}>
                        <h1>Please introduce your Card details:</h1>
                        <Form.Group className="FormGroup">
                            <Row className="FormRow">
                                <CardElement options={CARD_OPTIONS} />
                            </Row>
                        </Form.Group>
                        <Button>Pay</Button>
                    </Form>
                
                >>>>>>> Stashed changes */
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

                :
                <Container>
                    <h2>You just paid: </h2>
                </Container>

            }
        </>
    )
}