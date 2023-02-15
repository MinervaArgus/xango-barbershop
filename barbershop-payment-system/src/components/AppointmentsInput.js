import React, { useState, useEffect, useCallback } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { db } from "../Firebase.js";
import { collection, onSnapshot, query, addDoc } from "firebase/firestore"
import moment from "moment";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { Button, Container, Form, Toast, ToastContainer, Row, Col, InputGroup, ProgressBar } from 'react-bootstrap';

import { TextField, Buttonn } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios'


require('moment/locale/es.js')

const localizer = momentLocalizer(moment);

function AppointmentsInput() {
    const [showSuccess, setShowSuccess] = useState(false);

    const current = new Date();
    let currentDate = current.toJSON();
    // eslint-disable-next-line
    const todaysDate = currentDate.slice(0, 10);

    // eslint-disable-next-line
    var title, email, haircut;
    const initialState = {
        id: '',
        name: '',
        email: '',
        haircut: '',
        start: '',
        end: '',
        price: ''
    }//initial empty state

    //state for appointment to be added to db
    const [appointment, setAppointment] = useState({
        id: '',
        name: '',
        email: '',
        haircut: '',
        date: '',
        time: '',
        price: ''
    });//appointmment state 
    /* const dateInitial = {};
    const [date, setDate] = useState(''); //date state */

    //state with all appointments and all parameters
    const [allAppointments, setAllAppointments] = useState([{
        id: '',
        name: '',
        email: '',
        haircut: '',
        start: '',
        end: '',
        price: ''
    }]);//raw appointments from db

    //state with all the appointments filtered to display them in calendar
    const [calendarAppointments, setCalendarAppointments] = useState([{
        id: '',
        title: 'test35',
        start: new Date(2022, 9, 19, 15, 30, 0), end: new Date(2022, 9, 19, 17, 30, 0)
    }]); //filtered appointments

    const dateInitial = useState('');
    const [date, setDate] = useState(new Date()); //date state
    console.log("hoyyy " + date);

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
    const [daysClosed, setDaysClosed] = useState(['']);

    //get all the appointments from db
    useEffect(() => {
        //get all appointments from db
        onSnapshot(q, (snapshot) => {
            // eslint-disable-next-line
            snapshot.docs.map(doc => {
                console.log("docu: " + new Date(doc.data().start));
            })
            setAllAppointments(snapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
                email: doc.data().email,
                haircut: doc.data().haircut,
                start: new Date(doc.data().start),
                end: new Date(doc.data().end),
                price: doc.data().price
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

        //get all haircutsn from db
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
                new Date(doc.data().date)
            ])))
        })

        filterTime();
        // eslint-disable-next-line
    }, []);//useEffect

    console.log("depues de setAllAppointments: " + JSON.stringify(allAppointments));
    console.log("calendar appointments: " + JSON.stringify(calendarAppointments));
    console.log("haircuts: " + JSON.stringify(haircuts));

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
    //console.log("Appointments " + JSON.stringify(allAppointments));

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
        console.log("formated date: " + d);
        console.log("propper date: " + new Date(2022, 9, 19, 15, 30, 0));
        console.log("length: " + d.length);
        return d;
    }

    function formatDateNoTime(date) {
        var d = date.slice(4, 15);
        return d;
    }

    const addAppointment = async (e) => {
        setLoading(true);
        e.preventDefault();
        //if date is not undefined, add date to appointment state
        /* if (date !== '') {
            setAppointment({ ...appointment, [date]: date.toString() })
        } */ //not working right now, but should be the way to do it

        let s = formatDateNoTime(date.toString())
        let f = appointment.time
        let appointPrice = getHaircutPrice(appointment.haircut)
        console.log("s: " + s);
        console.log("date length" + s.length);
        console.log("timelength" + f.length);
        console.log("current appoint: " + JSON.stringify(appointment));
        if (s.length === 11 && f.length === 5) {
            try {
                await addDoc(collection(db, 'appointments'), {
                    name: appointment.name,
                    email: appointment.email,
                    haircut: appointment.haircut,
                    date: s,
                    time: f,
                    price: appointPrice.servicePrice
                })
                await axios.post('http://localhost:4000/api/mail', {
                    customerName: appointment.name,
                    to: appointment.email,
                    subject: "Appointment confirmation",
                    price: appointPrice.servicePrice + "€",
                    service: appointment.haircut,
                    date: s,
                    time: f,
                    html: '<strong>Some random html code</strong>'
                });

            } catch (e) {
                console.log(e.response.data);
            }
            setAppointment(initialState);
            appointPrice = '';
            eventStart = undefined;
            eventEnd = undefined;
            setLoading(false);
            setShowSuccess(true);

        } else {
            window.alert('Select desired time and date:');
        }
        // setDate(dateInitial);

        // setDate('')
    }//addAppointment

    function getHaircutPrice(name) {
        let haircutData = haircuts.find(haircut => haircut.typeOfService === name)

        if (haircutData === undefined) {
            console.log("Haircut data doesn't exist for:" + name);
            return undefined;
        }
        return haircutData;
    }

    const changeHandler = e => {
        if (e.target !== undefined) {
            console.log("haircuts array " + haircuts);
            if (e.target.name === 'haircut') {
                let hD = getHaircutPrice(e.target.value)
                console.log("HD" + hD.servicePrice);
                // setAppointment({ ...appointment, price: hD.servicePrice })
                setAppointment({ ...appointment, [e.target.name]: e.target.value })
            } else {
                setAppointment({ ...appointment, [e.target.name]: e.target.value })
            }
        }


    } //change handler
    console.log("handle change: " + JSON.stringify(appointment));

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
    //filter barbershop availability based on selected date
    function filterTime(e) {
        // console.log("date change: " + e);
        let d = new Date(e).getDay();
        // setTime(initTime);
        console.log("whatever: " + new Date(e).getDay());
        // calendarAppointments.map((item) => {
        // console.log("selected day: " + item.start.toString().slice(0, 3));
        if (d === 1) {//if for Mondays
            setTime(["closed"]);
            /* if (item.start.toString().slice(20, 25)) {
    
            } */
        } else if (d === 2) {
            setTime(['09:30', '10:30', '11:30', '12:30', '13:30', '14:30'])
        } else if (d === 3) {
            setTime(['09:30', '10:30', '11:30', '12:30', '13:30', '14:30'])
        } else if (d === 4) {
            setTime(['09:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30',
                '16:30', '17:30'])
        } else if (d === 5) {
            setTime(['09:30', '10:30', '11:30', '12:30', '13:30', '14:30', '15:30',
                '16:30', '17:30'])
        } else if (d === 6) {
            setTime(['09:30', '10:30', '11:30', '12:30'])
        } else if (d === 0) {
            setTime(["closed"])
        }
        console.log("time state: " + JSON.stringify(time));
    }

    //todays date
    const today = new Date();

    //handles date change
    const handleDateChange = (e) => {
        console.log("selected date: " + new Date(e));
        setDate(dateInitial);
        setDate(new Date(e));
        console.log("date state" + JSON.stringify(date));
        filterTime(e);
    }
    //state for loading (true while appointment is getting written to DB)
    const [loading, setLoading] = useState(false);
    //state for succes (true if appointment was correctly registered to DB)

    const handleClose = () => setShowSuccess(false);

    //formatDisabledDays
    function formatDisabled(date) {
        var d = date.slice(4, 16);
        return d;
    }

    const funcDaysClosed = (date) => {
        let d = formatDisabled(new Date(date).toString());
        // console.log("weird: " + date.getTime());
        // console.log("days closed state: " + JSON.stringify(daysClosed));
        // console.log("event date: " + d);
        // console.log("each date from days closed state: " + daysClosed.map((myDate) => new Date(myDate)))
        return daysClosed.map((myDate) => formatDisabled(new Date(myDate).toString())).includes(d)
    }
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* <ThemeProvider theme={theme}> */}
            <Container className="my-3">

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

                <h1>Make an appointment</h1>

                <Container>
                    <Form>
                        <Row className="justify-content-md-center">
                            <Col xs md="auto" lg="auto" className="m-2">
                                <InputGroup className="my-2">
                                    <Form.Control
                                        type="input"
                                        name='name'
                                        placeholder={"Name"}
                                        onChange={changeHandler}
                                    />
                                    <Form.Control
                                        type="input"
                                        name='email'
                                        placeholder={"Email"}
                                        onChange={changeHandler}
                                    />
                                </InputGroup>

                                <InputGroup className="my-2">
                                    <Form.Select name="haircut" defaultValue={"Type of Service:"} onChange={changeHandler}>
                                        <option disabled={true}>Type of Service:</option>
                                        <option disabled={true}>=========</option>
                                        {haircuts.map((e, key) => {
                                            return <option key={key} value={e.typeOfService || ''}>{e.typeOfService}</option>;
                                        })}
                                    </Form.Select>

                                    <Form.Select name="time" defaultValue={"Desired Time:"} onChange={changeHandler}>
                                        <option disabled={true}>Desired Time:</option>
                                        <option disabled={true}>=========</option>
                                        {time.map((e, key) => {
                                            return <option key={key} value={e || ''}>{e}</option>;
                                        })}
                                    </Form.Select>
                                </InputGroup>

                                <Container>
                                    <DesktopDatePicker
                                        required
                                        id="outlined-basic"
                                        variant="outlined"
                                        name="date"
                                        minDate={today}
                                        size="small"
                                        value={date}
                                        label="Date of Appointment"
                                        //(d) => new Date(d).getTime() === new Date('2022-11-11T00:00').getTime()
                                        onChange={handleDateChange}
                                        shouldDisableDate={funcDaysClosed}  // Date Filter
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Container>

                                <Button className="my-2" as="input" type="submit" onClick={addAppointment} value="Make Appointment" />
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Container>

            <Container className="my-4">
                <Calendar
                    /* components={
                        {
                            timeSlotWrapper: new Date()
                        }
                    } */

                    // selectable
                    localizer={localizer}
                    events={calendarAppointments}
                    defaultDate={new Date()}
                    defaultView="week"
                    style={{ height: "75vh" }}
                    messages={{
                        next: ">",
                        previous: "<",
                        today: "Hoy",
                        month: "Mes",
                        week: "Semana",
                        day: "Día"
                    }}
                // onSelectEvent={handleSelectEvent}
                // onSelectSlot={handleSelectSlot}
                />
            </Container>
            {/* </ThemeProvider> */}
        </LocalizationProvider>
    );
}

export default AppointmentsInput;