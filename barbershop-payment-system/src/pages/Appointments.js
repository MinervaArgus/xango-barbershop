import React, { useState, useEffect } from "react";
import { TextField, Button } from '@mui/material';
import { db } from "../Firebase.js";
import { collection, onSnapshot, query, orderBy, addDoc, serverTimestamp } from "firebase/firestore"
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import "../styles/Appointments.css";
import AppointmentsCalendar from "../components/AppointmentsCalendar.js";
import AppointPicker from "../components/AppointPicker.js";

//variable for current date
const current = new Date();
//format current date
const date = `${current.getMonth() + 1}-${current.getDate()}-${current.getFullYear()}`;
//query to get all appointments from db
const q = query(collection(db, 'appointments')/* , orderBy('timestamp', 'desc') */);

const Appointments = () => {

    /* //states
    const initialState = {
        id: '',
        name: '',
        email: '',
        haircut: '',
        date: ''
    }//initial empty state
    const [appointment, setAppointment] = useState({
        id: '',
        name: '',
        email: '',
        haircut: '',
        date: ''
    });//appointmment state
    const dateInitial = {};
    const [date, setDate] = useState(new Date()); //date state

    //console.log("Appointments " + JSON.stringify(appointment));
    const changeHandler = e => {
        if (e.target !== undefined) {
            setAppointment({ ...appointment, [e.target.name]: e.target.value })
        }
    } //change handler

    const addAppointment = async (e) => {
        e.preventDefault();
        //if date is not undefined, add date to appointment state
        if (date !== undefined) {
            setAppointment({ ...appointment, [date]: date.toString() })
        } //not working right now, but should be the way to do it
        await addDoc(collection(db, 'appointments'), {
            name: appointment.name,
            email: appointment.email,
            haircut: appointment.haircut,
            date: date.toString()
        })
        setAppointment(initialState);
        setDate(dateInitial);
        // setDate('')
    }//addAppointment 

    const getTitle = (title) => {

    } */
    return (
        <AppointmentsCalendar />
    );
}//appointment function

export default Appointments