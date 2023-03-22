import React, { useState, useEffect, useCallback } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { db } from "../firebase.js";
import { collection, onSnapshot, query, addDoc } from "firebase/firestore"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Button, Container, Form, Toast, ToastContainer, Row, Col, InputGroup, ProgressBar } from 'react-bootstrap';
import { TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import uuid from 'react-uuid';

require('moment/locale/es.js')

function AppointmentsInput(props) {
    let history = useHistory();
    const [showSuccess, setShowSuccess] = useState(false);
    const [validated, setValidated] = useState(false);
    const [appointmentAdded, setAppointmentAdded] = useState(false);
    // eslint-disable-next-line
    var title, email, haircut;
    const initialState = {
        id: '',
        name: '',
        email: '',
        haircut: '',
        date: '',
        time: '',
        price: '',
        paymentType: '',
        paid: ''
    }//initial empty state

    //state for appointment to be added to db
    const [appointment, setAppointment] = useState({
        id: '',
        name: '',
        email: '',
        haircut: '',
        date: '',
        time: '',
        price: '',
        paymentType: '',
        paid: ''
    });//appointmment state 
    /* const dateInitial = {};
    const [date, setDate] = useState(''); //date state */

    //state with all appointments and all parameters
    const [allAppointments, setAllAppointments] = useState([{
        id: '',
        name: '',
        email: '',
        haircut: '',
        date: '',
        time: '',
        price: '',
        paymentType: '',
        paid: '',
        appointmentID: ''
    }]);//raw appointments from db

    //state with all the appointments filtered to display them in calendar
    const [calendarAppointments, setCalendarAppointments] = useState([{
        id: '',
        title: 'test35',
        start: new Date(2022, 9, 19, 15, 30, 0), end: new Date(2022, 9, 19, 17, 30, 0)
    }]); //filtered appointments

    const dateInitial = useState('');
    const [date, setDate] = useState(new Date()); //date state
    // console.log("hoyyy " + date);

    const [haircuts, setHaircuts] = useState([{
        id: '',
        servicePrice: '',
        typeOfService: ''
    }])//haircut state

    //query to get all appointments from db
    const q = query(collection(db, 'appointments'));

    //query to get all haircuts
    const q2 = query(collection(db, 'hairstylePrices'));

    //query to get all daysClosed
    const q3 = query(collection(db, 'daysClosed'));

    //state for days closed
    const [daysClosed, setDaysClosed] = useState(new Date().toJSON().slice(0, 10));

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        console.log("form validity: ", form.checkValidity());
        if (form.checkValidity() === false) {
            // event.preventDefault();
            // setValidated(false);
            event.stopPropagation();
        } else if (form.checkValidity() === true) {
            addAppointment();

        }
        setValidated(true);
    }

    //get all the appointments from db
    useEffect(() => {
        //get all appointments from db
        onSnapshot(q, (snapshot) => {
            // eslint-disable-next-line
            snapshot.docs.map(doc => {
                //console.log("docu: " + new Date(doc.data().start));
            })
            setAllAppointments(snapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
                email: doc.data().email,
                haircut: doc.data().haircut,
                date: doc.data().date,
                time: doc.data().time,
                price: doc.data().price,
                paymentType: doc.data().paymentType,
                paid: doc.data().paid,
                appointmentID: doc.data().appointmentID || ''
            })))

            setCalendarAppointments(snapshot.docs.map(doc => ({
                // ...calendarAppointments,
                id: doc.id,
                title: doc.data().name,
                start: new Date(doc.data().date + " " + doc.data().time),
                end: new Date(formatEndDate(doc.data().date, doc.data().time))
            })))
            // snapshot.docs.map(doc => { filterAppointments(doc) }) */
        })

        //get all haircuts from db
        onSnapshot(q2, (snapshot) => {
            setHaircuts(snapshot.docs.map(doc => ({
                id: doc.id,
                servicePrice: doc.data().servicePrice,
                typeOfService: doc.data().typeOfService
            })))
        })

        //get all disabled dates from db
        onSnapshot(q3, (snapshot) => {
            setDaysClosed(snapshot.docs.map(doc => ([
                doc.data().date
            ])))
        })

        // filterTime();
        // eslint-disable-next-line
    }, []);//useEffect

    // console.log("despues de setAllAppointments: " + JSON.stringify(allAppointments));
    // console.log("calendar appointments: " + JSON.stringify(calendarAppointments));
    // console.log("haircuts: " + JSON.stringify(haircuts));

    //function to format end date
    function formatEndDate(d, t) {
        // console.log("end date: " + new Date(d).getDay());
        let hour = t.slice(0, 2);
        let minutes = t.slice(3, 5);
        let weekDay = new Date(d).getDay();
        let newHour = 0;
        if (weekDay === 2 || weekDay === 3) {
            if (parseInt(hour) <= 13) {
                if (minutes === '30') {
                    newHour = parseInt(hour) + 1;
                } else if (minutes === '00') {
                    //to be implemented
                }
            } else {
                newHour = parseInt(hour);
            }
        } else if (weekDay === 4 || weekDay === 5) {
            if (parseInt(hour) <= 16) {
                if (minutes === '30') {
                    newHour = parseInt(hour) + 1;
                } else if (minutes === '00') {
                    //to be implemented
                }
            }
        } else if (weekDay === 6) {
            if (parseInt(hour) <= 11) {
                if (minutes === '30') {
                    newHour = parseInt(hour) + 1;
                } else if (minutes === '00') {
                    //to be implemented
                }
            }
        }//end of if
        // console.log("finished product: " + d + " " + newHour.toString() + ":" + minutes);
        return d + " " + newHour.toString() + ":" + minutes;
    }

    // eslint-disable-next-line
    function filterAppointments(doc) {
        // eslint-disable-next-line
        calendarAppointments.map((item) => {
            if (item.id === '' &&
                item.title === doc.data().name &&
                item.start === doc.data().start &&
                item.end === doc.data().end) {
                item.id = doc.id;
            }
        });
    }

    // console.log("time format from DB: " + JSON.stringify(allAppointments));
    // console.log("time format from JS: " + JSON.stringify(calendarAppointments));
    //// console.log("Appointments " + JSON.stringify(allAppointments));

    // eslint-disable-next-line
    var eventStart, eventEnd;

    // eslint-disable-next-line
    const handleSelectSlot = (e) => {
        // console.log(e.start);
        // console.log("inside" + JSON.stringify(appointment));

        if (appointment.name.length === 0) {
            window.alert('Enter name first')
        } else if (appointment.email.length === 0) {
            window.alert('Enter email first')
        } else if (appointment.haircut.length === 0) {
            window.alert('Enter haircut first')
        } else {
            title = appointment.name;
            var start = e.start;
            var end = e.end;
            // eslint-disable-next-line
            setAppointment({ ...appointment, ["start"]: e.start, ["end"]: e.end })
            setCalendarAppointments((prev) => [...prev, { title, start, end }])
            // console.log(JSON.stringify(calendarAppointments));
        }

        // console.log("appointment after inside: ", JSON.stringify(appointment));
    }


    // eslint-disable-next-line
    const handleSelectEvent = useCallback(
        (event) => window.alert(event.title),
        []
    );


    // eslint-disable-next-line
    function formatDate(date) {
        var d = date.slice(0, 25)
        // console.log("formated date: " + d);
        // console.log("propper date: " + new Date(2022, 9, 19, 15, 30, 0));
        // console.log("length: " + d.length);
        return d;
    }

    function formatDateNoTime(date) {
        var d = date.slice(4, 15);
        return d;
    }
    function generateID() {
        let id = uuid();
        // console.log(`iddd`, id);
        setAppointment({ ...appointment, appointmentID: id });

    }
    // console.log(`appointment id: `, appointment.id);

    /* const addAppointment = async (e) => { */
    async function addAppointment() {
        // e.preventDefault();
        setLoading(true);
        let id = uuid();
        console.log("id: ", id);
        let s = formatDateNoTime(date.toString())
        let f = appointment.time
        // let appointPrice = getHaircutPrice(appointment.haircut)
        console.log("sss: " + s);
        // console.log("date length" + s.length);
        console.log("timelength" + f.length);
        console.log("current appoint: " + JSON.stringify(appointment));

        if (s.length === 11 && f.length === 5) {
            if (appointment.paymentType === 'online') {
                // console.log("estamo activo");
                history.push({
                    pathname: "/checkOut",
                    state: {
                        // amount: appointment.price,
                        appointment,
                        date: s,
                        time: f,
                        appointmentID: id
                    }
                });
            } else if (appointment.paymentType === 'store') {
                try {
                    await addDoc(collection(db, 'appointments'), {
                        name: appointment.name,
                        email: appointment.email,
                        haircut: appointment.haircut,
                        date: s,
                        time: f,
                        price: appointment.price,
                        paymentType: appointment.paymentType,
                        paid: appointment.paid,
                        appointmentID: id
                    });
                    await axios.post('http://localhost:4000/api/mail', {
                        customerName: appointment.name,
                        to: appointment.email,
                        subject: "Appointment confirmation",
                        price: appointment.price + "€",
                        service: appointment.haircut,
                        date: s,
                        time: f,
                        appointmentID: id
                    });

                } catch (e) {
                    console.log(e.response.data);
                }

                props.appointmentStatus(true, appointment, s);
            }
            setAppointment(initialState);
            // appointPrice = '';
            eventStart = undefined;
            eventEnd = undefined;
            setLoading(false);
            setShowSuccess(true);

        } else {
            window.alert('Select desired time:');
            setLoading(false);
            setShowSuccess(false);
        }
    }
    // setDate(dateInitial);

    // setDate('')
    //addAppointment

    function getHaircutPrice(name) {
        let haircutData = haircuts.find(haircut => haircut.typeOfService === name)

        if (haircutData === undefined) {
            // console.log("Haircut data doesn't exist for:" + name);
            return undefined;
        }
        return haircutData;
    }

    const changeHandler = e => {
        if (e.target !== undefined) {
            // console.log("haircuts array " + haircuts);
            if (e.target.name === 'haircut') {
                let hD = getHaircutPrice(e.target.value)
                // console.log("HD" + hD.servicePrice);
                // setAppointment({ ...appointment, price: hD.servicePrice })
                setAppointment({ ...appointment, [e.target.name]: e.target.value, price: hD.servicePrice })
            } else if (e.target.name === 'paymentType') {
                if (e.target.value === 'store') {
                    // console.log("paymentType value: " + e.target.value);
                    setAppointment({ ...appointment, [e.target.name]: e.target.value, paid: "false" })

                } else if (e.target.value === 'online') {
                    // console.log("paymentType value: " + e.target.value);
                    setAppointment({ ...appointment, [e.target.name]: e.target.value, paid: "true" })
                    /* setAppointment({ ...appointment, paid: "true" }) */
                    //wont be 100% paid until stripe payment goes thru, but we leave it like that for now.
                }
            } else {
                setAppointment({ ...appointment, [e.target.name]: e.target.value })
            }
        }


    } //change handler
    // console.log("handle change: " + JSON.stringify(appointment));

    const [initTime] = useState(['']);
    const [time, setTime] = useState(filterDefaultTime(new Date().getDay()));

    //filter barbershop availability based on current date
    function filterDefaultTime(d) {
        if (d === 1) {//if for Mondays
            return ["closed on mondays"];
            /* if (item.start.toString().slice(20, 25)) {
     
            } */
        } else if (d === 2) {
            return ['09:30', '10:30', '11:30', '12:30', '13:30', '14:30'];
        } else if (d === 3) {
            return ['09:30', '10:30', '11:30', '12:30', '13:30', '14:30'];
        } else if (d === 4) {
            return ['09:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30',
                '16:30', '17:30'];
        } else if (d === 5) {
            return ['09:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30',
                '16:30', '17:30']
        } else if (d === 6) {
            return ['09:30', '10:30', '11:30', '12:30'];
        } else if (d === 0) {
            return ["closed on Sundays"];
        }
    }

    function checkIf2(day) {
        let todayAppointments = [];
        // console.log("hoy: ", day);
        allAppointments.map((appointment) => {
            // console.log("appointmennt date: ", appointment.date);
            if (appointment.date === day) {
                todayAppointments.push(appointment);
            }
        })
        // console.log("today app: ", todayAppointments);
        const unique = [];
        let count = 0;
        for (const item of todayAppointments) {
            // console.log("item time:", item.time);
            todayAppointments.find((obj) => {
                console.log("obj time:", obj.time, "item time: ", item.time)
                console.log("count", count);
                if (obj.time === item.time) {
                    count++;
                    console.log("count", count);
                    // console.log("count", count);
                } if (count === 2) {
                    if (!unique.includes(item.time)) {
                        unique.push(item.time);
                        count = 0;
                    }
                }
            }
            );
            count = 0;
        }
        console.log("unique: ", unique);
        return unique;
    }
    //filter barbershop availability based on selected date
    function filterTime(e) {
        // console.log("la e: ", e);
        let schedule = [];
        let notAvailableTimes = checkIf2(e);
        // console.log("date change: " + e);
        let d = new Date(e).getDay();
        // setTime(initTime);
        // console.log("whatever: " + new Date(e).getDay());
        // calendarAppointments.map((item) => {
        // console.log("selected day: " + item.start.toString().slice(0, 3));
        if (d === 1) {//if for Mondays
            setTime(["closed"]);
            /* if (item.start.toString().slice(20, 25)) {
     
            } */
        } else if (d === 2) {
            schedule = ['09:30', '10:30', '11:30', '12:30', '13:30', '14:30'];
            schedule = removeRepeatedTimes(schedule, notAvailableTimes)
            setTime(schedule);
        } else if (d === 3) {
            schedule = ['09:30', '10:30', '11:30', '12:30', '13:30', '14:30'];
            schedule = removeRepeatedTimes(schedule, notAvailableTimes)
            setTime(schedule);
        } else if (d === 4) {
            schedule = ['09:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30',
                '16:30', '17:30'];
            schedule = removeRepeatedTimes(schedule, notAvailableTimes)
            setTime(schedule);
        } else if (d === 5) {
            schedule = ['09:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30',
                '16:30', '17:30'];
            schedule = removeRepeatedTimes(schedule, notAvailableTimes)
            setTime(schedule);
        } else if (d === 6) {
            schedule = ['09:30', '10:30', '11:30', '12:30'];
            schedule = removeRepeatedTimes(schedule, notAvailableTimes)
            setTime(schedule);
        } else if (d === 0) {
            setTime(["closed"])
        }
        // console.log("time state: " + JSON.stringify(time));
    }

    function removeRepeatedTimes(initialSchedule, notAvailableTimes) {
        let schedule = initialSchedule;
        notAvailableTimes.map((time) => {
            schedule = schedule.filter(e => e !== time);
        });
        return schedule;
    }

    //todays date
    const today = new Date();

    //handles date change
    const handleDateChange = (e) => {
        // console.log("selected date: " + new Date(e));
        // setDate(dateInitial);
        setDate(new Date(e));
        // console.log("date state" + JSON.stringify(date));
        filterTime(formatDateNoTime(new Date(e).toString()));
    }
    //state for loading (true while appointment is getting written to DB)
    const [loading, setLoading] = useState(false);
    //state for succes (true if appointment was correctly registered to DB)

    const handleClose = () => setShowSuccess(false);

    const funcDaysClosed = (dateParam) => {
        let pickerDate = new Date(dateParam).toISOString().slice(0, 10);
        return daysClosed.toString().includes(pickerDate)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {
                loading ? (<ProgressBar striped animated now={"100"} />) : null
            }

            {
                showSuccess ? (
                    <ToastContainer className="p-3" containerPosition="fixed" position="top-end">
                        <Toast show={showSuccess} onClose={() => setShowSuccess(false)} autohide delay={5000}>
                            <Toast.Body onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                                Appointment added!
                            </Toast.Body>
                        </Toast>
                    </ToastContainer>
                ) : null
            }

            {/* {
                validated ? (addAppointment) : null
            } */}

            <Container className="my-3">
                <h1>Make an appointment</h1>
                <Container>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="justify-content-md-center">
                            <Col xs md="auto" lg="auto" className="m-2">
                                <InputGroup as={Row} hasValidation className="my-2">
                                    <Form.Group className="my-1">
                                        <Form.Control
                                            required
                                            type="text"
                                            name='name'
                                            minLength={"1"}
                                            placeholder={"Name"}
                                            onChange={changeHandler}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter your full name!
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="my-1">
                                        <Form.Control
                                            required
                                            type="email"
                                            name='email'
                                            placeholder={"Email"}
                                            onChange={changeHandler}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a valid e-mail!
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </InputGroup>

                                <InputGroup as={Row} hasValidation className="my-2">
                                    <Form.Group>
                                        <DesktopDatePicker
                                            required
                                            id="outlined-basic"
                                            variant="outlined"
                                            name="date"
                                            minDate={today}
                                            size="small"
                                            value={date}
                                            label="Date of Appointment"
                                            disablePast
                                            //(d) => new Date(d).getTime() === new Date('2022-11-11T00:00').getTime()
                                            onChange={handleDateChange}
                                            shouldDisableDate={funcDaysClosed}  // Date Filter funcDaysClosed
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Form.Group>

                                    <Form.Group className="my-1">
                                        <Form.Select required name="time" defaultValue={"Desired Time:"} id="desiredTime" onChange={changeHandler}>
                                            <option value="">Desired Time:</option>
                                            <option disabled={true} value="">=========</option>
                                            {time.map((e, key) => {
                                                // if (e.length = 0) {
                                                return <option key={key} value={e || ''}>{e}</option>;
                                                // }
                                            })}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Please select a valid time!
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </InputGroup>

                                <InputGroup as={Row} hasValidation className="my-2">
                                    <Form.Group className="my-1">
                                        <Form.Select required name="haircut" defaultValue={"Type of Service:"} onChange={changeHandler}>
                                            <option value="">Type of Service:</option>
                                            <option disabled={true} value="">=========</option>
                                            {haircuts.map((e, key) => {
                                                return <option key={key} value={e.typeOfService || ''}>{e.typeOfService}</option>;
                                            })}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Please select a valid service!
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="my-1">
                                        <Form.Select required name="paymentType" defaultValue={"Payment format:"} onChange={changeHandler}>
                                            <option value="">Payment format:</option>
                                            <option disabled={true} value="">=========</option>
                                            <option value='store'>Pay in store</option>
                                            <option value='online'>Pay Online</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Please select a valid payment format!
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                </InputGroup>
                                <Button className="mt-3" as="input" type="submit" value="Make Appointment" /* onClick={addAppointment} */ />
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Container>
            <Container className="my-3">
                <h4>Already have an Appointment?</h4>
                <a id="link" href="/appointmentStatus">Find my appointment</a>
            </Container>
            {/* </ThemeProvider> */}
        </LocalizationProvider>
    );
}

export default AppointmentsInput;