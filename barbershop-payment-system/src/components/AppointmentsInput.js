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
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import { esES } from '@mui/material/locale'
import { createTheme } from "@mui/system";
import { ThemeProvider } from "@emotion/react";
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
require('moment/locale/es.js')

const localizer = momentLocalizer(moment);

function AppointmentsInput() {
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
        date: '',
        time: ''
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

    const dateInitial = useState('');
    const [date, setDate] = useState(new Date()); //date state

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
    }, []);//useEffect

    console.log("depues de setAllAppointments: " + JSON.stringify(allAppointments));
    console.log("calendar appointments: " + JSON.stringify(calendarAppointments));
    console.log("haircuts: " + JSON.stringify(haircuts));

    //function to format end date
    function formatEndDate(d, t) {
        console.log("end date: " + new Date(d).getDay());
        let hour = t.slice(0, 2);
        let minutes = t.slice(3, 5);
        let weekDay = new Date(d).getDay();
        let newHour = 0;
        if (weekDay === 2 || weekDay === 3) {
            if (parseInt(hour) <= 13) {
                if (minutes == '30') {
                    newHour = parseInt(hour) + 1;
                } else if (minutes == '00') {
                    //to be implemented
                }
            } else {
                newHour = parseInt(hour);
            }
        } else if (weekDay === 4 || weekDay === 5) {
            if (parseInt(hour) <= 16) {
                if (minutes == '30') {
                    newHour = parseInt(hour) + 1;
                } else if (minutes == '00') {
                    //to be implemented
                }
            }
        } else if (weekDay === 6) {
            if (parseInt(hour) <= 11) {
                if (minutes == '30') {
                    newHour = parseInt(hour) + 1;
                } else if (minutes == '00') {
                    //to be implemented
                }
            }
        }//end of if
        console.log("finished product: " + d + " " + newHour.toString() + ":" + minutes);
        return d + " " + newHour.toString() + ":" + minutes;
    }

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
        console.log("s: " + s);
        console.log("date length" + s.length);
        console.log("timelength" + f.length);
        if (s.length === 11 && f.length === 5) {

            await addDoc(collection(db, 'appointments'), {
                name: appointment.name,
                email: appointment.email,
                haircut: appointment.haircut,
                date: s,
                time: f
            })
            setAppointment(initialState);
            eventStart = undefined;
            eventEnd = undefined;
            setLoading(false);
            setSucces({ open: true });
        } else {
            window.alert('Select desired time and date:');
        }
        // setDate(dateInitial);

        // setDate('')
    }//addAppointment


    const changeHandler = e => {
        if (e.target !== undefined) {
            setAppointment({ ...appointment, [e.target.name]: e.target.value })
        }
        console.log("handle change: " + JSON.stringify(appointment));
    } //change handler

    const [initTime] = useState(['']);
    const [time, setTime] = useState(filterDefaultTime(new Date().getDay()));

    //filter barbershop availability based on current date
    function filterDefaultTime(d) {
        if (d === 1) {//if for Mondays
            return "closed";
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
            return "closed";
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
    const [succes, setSucces] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'right'
    });
    const { vertical, horizontal, open } = succes;

    const handleClose = () => {
        setSucces({ ...succes, open: false });
    };

    //formatDisabledDays
    function formatDisabled(date) {
        var d = date.slice(4, 16);
        return d;
    }

    const funcDaysClosed = (date) => {
        let d = formatDisabled(new Date(date).toString());
        // console.log("weird: " + date.getTime());
        console.log("days closed state: " + JSON.stringify(daysClosed));
        console.log("event date: " + d);
        console.log("each date from days closed state: " + daysClosed.map((myDate) => new Date(myDate)))
        return daysClosed.map((myDate) => formatDisabled(new Date(myDate).toString())).includes(d)
    }
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* <ThemeProvider theme={theme}> */}
            <div className="appointments">

                {
                    loading ? (<LinearProgress />) : null
                }
                {
                    succes ? (<Snackbar open={open} autoHideDuration={6000} onClose={handleClose} key={vertical + horizontal}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Appointment added!
                        </Alert>
                    </Snackbar>) : null
                }
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

                            <FormControl required sx={{ m: 1, minWidth: 120, maxHeight: 50 }}>
                                <InputLabel id="demo-simple-select-required-label">Haircut</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    id="demo-simple-select-required"
                                    /* value={haircuts} */
                                    name="haircut"
                                    autoWidth
                                    label="Haircut *"
                                    onChange={changeHandler}
                                >
                                    {haircuts.map((e, key) => {
                                        return <MenuItem key={key} value={e.typeOfService || ''}>{e.typeOfService}</MenuItem>;
                                    })}
                                </Select>
                            </FormControl>

                            <DesktopDatePicker
                                required
                                id="outlined-basic"
                                variant="outlined"
                                name="date"
                                minDate={today}
                                size="small"
                                value={date}
                                //(d) => new Date(d).getTime() === new Date('2022-11-11T00:00').getTime()
                                onChange={handleDateChange}
                                shouldDisableDate={funcDaysClosed}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <FormControl required sx={{ m: 1, minWidth: 120, maxHeight: 50 }}>
                                <InputLabel id="demo-simple-select-required-label">Time</InputLabel>
                                <Select
                                    labelId="demo-simple-select-required-label"
                                    id="demo-simple-select-required"
                                    // value={time}
                                    name="time"
                                    autoWidth
                                    label="Time *"
                                    onChange={changeHandler}
                                >
                                    {time.map((e, key) => {
                                        return <MenuItem key={key} value={e || ''}>{e}</MenuItem>;
                                    })}
                                </Select>
                            </FormControl>
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
            </div>
            {/* </ThemeProvider> */}
        </LocalizationProvider>
    );
}

export default AppointmentsInput;