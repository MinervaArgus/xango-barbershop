import React from "react";

import "../styles/Appointments.css";

import AppointmentsInput from "../components/AppointmentsInput.js";


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
        <AppointmentsInput />
    );
}//appointment function

export default Appointments