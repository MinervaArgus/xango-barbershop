import React, { useState } from "react";

import "../styles/Appointments.css";

import AppointmentsInput from "../components/AppointmentsInput.js";

import { Container } from 'react-bootstrap';
import AppointmentSucces from "../components/AppointmentSuccess";

const Appointments = () => {
    const [appointmentAdded, setAppointmentAdded] = useState(false);
    const [appointment, setAppointment] = useState();
    const [date, setDate] = useState();
    function appointmentStatus(status, appointmentState, appointmentDate) {
        setAppointment(appointmentState);
        setDate(appointmentDate);
        if (status) {
            setAppointmentAdded(true);
        } else if (!status) {
            setAppointmentAdded(false);
        }
    }
    return (
        <Container>
            {appointmentAdded ? <AppointmentSucces state={appointment} date={date} /> : <AppointmentsInput appointmentStatus={appointmentStatus} />}
        </Container>


    );
}//appointment function

export default Appointments