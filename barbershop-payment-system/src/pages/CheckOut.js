import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import StripeContainer from '../components/StripeContainer';
import "../styles/StripeStyle.css";
import { Container, Button } from 'react-bootstrap'


export default function CheckOut() {
    const [showItem, setShowItem] = useState(false)
    const location = useLocation()
    const { appointment, date, time, appointmentID } = location.state

    return (
        // <<<<<<< Updated upstream
        <Container className='my-4'>
            {showItem ? <StripeContainer
                appointment={appointment}
                date={date}
                time={time}
                id={appointmentID} />
                :
                <> <h3>${appointment.price}</h3>
                    <Button id="StripeButton" onClick={() => setShowItem(true)}>Purchase</Button></>}
        </Container>
        /* =======
                <div>
        
                    {showItem ? <StripeContainer amount={amount} /> : <> <h3>${amount}</h3> <button onClick={() =>
                        setShowItem(true)}>Purchase</button></>}
                </div>
        >>>>>>> Stashed changes */
    );
}