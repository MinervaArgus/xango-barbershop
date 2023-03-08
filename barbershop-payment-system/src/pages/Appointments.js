import React from "react";

import "../styles/Appointments.css";

import AppointmentsInput from "../components/AppointmentsInput.js";

import { Container } from 'react-bootstrap';

const Appointments = () => {

    return (
        <Container className="my-3">
            <AppointmentsInput />
        </Container>
    );
}//appointment function

export default Appointments