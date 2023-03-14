import React, { useState } from "react";
import { Container, Form, Row, Col, InputGroup, Button, Table, ProgressBar } from 'react-bootstrap';
import axios from 'axios';



export default function AppointmentStatus() {
    const inputInitialState = {
        email: '',
        id: ''
    }
    const [input, setInput] = useState({
        email: '',
        id: ''
    })
    const [appointments, setAppointments] = useState([]);
    const appointmentsInitialState = [];
    const renderAppointment = (appointment, index) => {
        return (
            <tr key={index}>
                <td>{appointment.date}</td>
                <td>{appointment.haircut}</td>
                <td>{appointment.time}</td>
                <td>{appointment.price}€</td>
                <td><Button variant="danger" as="input" type="submit" onClick={cancelAppointment} value="Cancel" /></td>
            </tr>

        )
    }
    const cancelAppointment = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.delete(`http://localhost:4000/api/cancelAppointment/${input.email}/${input.id}`)
                .then(res => {
                    if (res.data == "success") {
                        console.log("inside");
                        setCanceled(true);
                        setAppointments([]);
                    } else {
                        setError(res.data)
                    }
                });
            setInput(inputInitialState);
            setLoading(false);
        } catch (e) {
            console.log(e);
            setInput(inputInitialState);
            setLoading(false);
        }
    }
    console.log("appointments length: ", appointments.length);

    const [loading, setLoading] = useState(false);
    const [canceled, setCanceled] = useState(false);
    const [wrongInput, setWrongInput] = useState(false);
    const [error, setError] = useState("");


    const changeHandler = (e) => {
        if (e.target !== undefined) {
            setInput({ ...input, [e.target.name]: e.target.value })
        }
    }
    // console.log("appointment: " + JSON.stringify(appointment));
    const checkAppointment = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (input.email.length !== 0 && input.id.length !== 0) {
            setLoading(true);
            try {
                await axios.get(`http://localhost:4000/api/checkAppointment/${input.email}/${input.id}`)
                    .then(res => setAppointments(res.data.map(doc => ({
                        id: doc.id,
                        name: doc.name,
                        email: doc.email,
                        haircut: doc.haircut,
                        date: doc.date,
                        time: doc.time,
                        price: doc.price,
                        paymentType: doc.paymentType,
                        paid: doc.paid
                    }))));
                setLoading(false);
            } catch (e) {
                console.log(e);
                setLoading(false);
            }
        } else {
            setWrongInput(true);
        }

    }
    console.log('appointments: ', JSON.stringify(appointments), "appointments lenght: ", appointments.length);

    return (
        <div>
            {
                loading ? (<ProgressBar striped animated now={"100"} />) : null
            }

            <Container className="my-3">
                <Form>
                    <Row className="justify-content-md-center">
                        <h1>Enter your appointment details:</h1>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col xs md="5" lg="5" className="m-2">
                            <InputGroup className="my-2">
                                <Form.Control
                                    className="text-center"
                                    type="input"
                                    name='email'
                                    placeholder={"Email"}
                                    value={input.email}
                                    onChange={changeHandler}
                                />
                                <Form.Control
                                    className="text-center"
                                    type="input"
                                    name='id'
                                    placeholder={"ID"}
                                    value={input.id}
                                    onChange={changeHandler}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col xs md="auto" lg="auto" className="m-2">
                            <Button as="input" type="submit" onClick={checkAppointment} value="Check Appointment" />
                        </Col>
                    </Row>
                </Form>

                {
                    canceled ?
                        <h3>Appointment succesfully canceled</h3>
                        :
                        appointments.length >= 1 ? // appointments.map((appointment, i) => { 

                            <Table striped bordered hover >
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Service</th>
                                        <th>Time</th>
                                        <th>Price</th>
                                        <th>Cancel</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appointments.map(renderAppointment)}
                                </tbody>
                            </Table>

                            //  }) 
                            : ''
                }
            </Container>
        </div>
    );
}