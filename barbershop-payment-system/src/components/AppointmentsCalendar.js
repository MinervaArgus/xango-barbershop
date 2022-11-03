import React, { useState, useEffect, useCallback } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { db } from "../Firebase.js";
import { collection, onSnapshot, query, orderBy, addDoc, serverTimestamp } from "firebase/firestore"
import moment from "moment";
import { FirebaseError } from "@firebase/util";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, Button } from '@mui/material';

require('moment/locale/es.js')

const localizer = momentLocalizer(moment);

function AppointmentsCalendar() {
    var title, email, haircut;
    const initialState = {
        id: '',
        name: '',
        email: '',
        haircut: '',
        start: '',
        end: ''
    }//initial empty state

    //state for appointment to be added to db
    const [appointment, setAppointment] = useState({
        id: '',
        name: '',
        email: '',
        haircut: '',
        start: '',
        end: ''
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
        end: ''
    }]);//raw appointments from db

    //state with all the appointments filtered to display them in calendar
    const [calendarAppointments, setCalendarAppointments] = useState([{
        id: '',
        title: 'test35',
        start: new Date(2022, 9, 19, 15, 30, 0), end: new Date(2022, 9, 19, 17, 30, 0)
    }]); //filtered appointments


    //query to get all appointments from db
    const q = query(collection(db, 'appointments'));

    //get all the appointments from db
    useEffect(() => {
        onSnapshot(q, (snapshot) => {
            snapshot.docs.map(doc => {
                console.log("docu: " + new Date(doc.data().start));
            })
            setAllAppointments(snapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
                email: doc.data().email,
                haircut: doc.data().haircut,
                start: new Date(doc.data().start),
                end: new Date(doc.data().end)
            })))

            setCalendarAppointments(snapshot.docs.map(doc => ({
                ...calendarAppointments,
                id: doc.id,
                title: doc.data().name,
                start: new Date(doc.data().start),
                end: new Date(doc.data().end)
            })))
            // snapshot.docs.map(doc => { filterAppointments(doc) }) */
        })


    }, []);//useEffect
    console.log("depues de setAllAppointments: " + JSON.stringify(allAppointments));
    console.log("calendar appointments: " + JSON.stringify(calendarAppointments));
    function filterAppointments(doc) {
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

    var eventStart, eventEnd;

    const handleSelectSlot =
        (e) => {
            console.log(e.start);
            console.log("inside" + JSON.stringify(appointment));
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
                setAppointment({ ...appointment, ["start"]: e.start, ["end"]: e.end })

                setCalendarAppointments((prev) => [...prev, { title, start, end }])

                // console.log(JSON.stringify(calendarAppointments));
            }
            // }   
            console.log("appointment after inside: ", JSON.stringify(appointment));
        }


    const handleSelectEvent = useCallback(
        (event) => window.alert(event.title),
        []
    );

    function formatDate(date) {
        var d = date.slice(0, 25)
        console.log("formated date: " + d);
        console.log("propper date: " + new Date(2022, 9, 19, 15, 30, 0));
        console.log("length: " + d.length);
        return d;
    }

    const addAppointment = async (e) => {
        e.preventDefault();
        //if date is not undefined, add date to appointment state
        /* if (date !== '') {
            setAppointment({ ...appointment, [date]: date.toString() })
        } */ //not working right now, but should be the way to do it

        let s = formatDate(appointment.start.toString())
        let f = formatDate(appointment.end.toString())
        console.log("start length" + s.length);
        if (s.length === 25 && f.length === 25) {

            await addDoc(collection(db, 'appointments'), {
                name: appointment.name,
                email: appointment.email,
                haircut: appointment.haircut,
                start: s,
                end: f
            })
            setAppointment(initialState);
            eventStart = undefined;
            eventEnd = undefined;
        } else {
            window.alert('Select desired time in calendar');
        }
        // setDate(dateInitial);

        // setDate('')
    }//addAppointment


    const changeHandler = e => {
        if (e.target !== undefined) {
            console.log();
            setAppointment({ ...appointment, [e.target.name]: e.target.value })
        }
        console.log(JSON.stringify(appointment));
    } //change handler

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="appointments">
                <div className="userInput">
                    <form id="appointmentsForm">
                        <h2>Make an appointment</h2>
                        <div className="inputFields">
                            <TextField
                                required
                                id="outlined-basic"
                                label="Name"
                                variant="outlined"
                                name="name"
                                size="small"
                                onChange={changeHandler} /> {/* name */}

                            <TextField
                                required
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                name="email"
                                size="small"
                                onChange={changeHandler} />{/* email */}

                            <TextField
                                required
                                id="outlined-basic"
                                label="Haircut"
                                variant="outlined"
                                name="haircut"
                                size="small"
                                onChange={changeHandler} />{/* haircute */}

                            {/*  <DateTimePicker
                                required
                                id="outlined-basic"
                                label="Date&Time picker"
                                variant="outlined"
                                name="date"
                                size="small"
                                value={date}
                                onChange={e => setDate(e)}
                                renderInput={(params) => <TextField {...params} />}
                            />/* date */}
                            <Button id="button-basic" variant="contained" color="primary" onClick={addAppointment}>Make Appointment</Button>
                        </div>
                    </form>
                </div>

            </div>
            <div className="calendar">
                <Calendar
                    /* components={
                        {
                            timeSlotWrapper: new Date()
                        }
                    } */

                    selectable
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
                    onSelectEvent={handleSelectEvent}
                    onSelectSlot={handleSelectSlot}
                />
            </div>
        </LocalizationProvider>
    );
}

export default AppointmentsCalendar;