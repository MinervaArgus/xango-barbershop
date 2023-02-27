import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { Container } from "react-bootstrap";
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
                const response = await axios.post("http://localhost:4000/api/payment", {
                    amount: props.amount * 100,
                    id
                })
                if (response.data.success) {
                    console.log("Succesful payment")
                    setSuccess(true)
                    // await delay(5000)
                    // history.push("/home")
                }
            } catch (error) {
                console.log("Error: ", error);
            }
        } else {
            console.log(error.message);
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