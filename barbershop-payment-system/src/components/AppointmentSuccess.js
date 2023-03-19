import { Container } from "@mui/system";
import React from "react";

const AppointmentSucces = (props) => {
    return (
        <Container>
            <h1>{props.state.name}, your appointment has been confirmed</h1>
            <h3>Appointment details:</h3>
            <ul>
                <li>Email: {props.state.email}</li>
                <li>Haircut: {props.state.haircut}</li>
                <li>Date: {props.date}</li>
                <li>Time: {props.state.time}</li>
                <li>Price: {props.state.price}€</li>
            </ul>
        </Container>
    );
}

export default AppointmentSucces;