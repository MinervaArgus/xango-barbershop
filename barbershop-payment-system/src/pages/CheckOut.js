import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import StripeContainer from '../components/StripeContainer';
import "../styles/StripeStyle.css";
import { Container, Button } from 'react-bootstrap'


export default function CheckOut() {
    const [showItem, setShowItem] = useState(false)
    const location = useLocation()
    const { appointment, date, time, appointmentID, amount, cart } = location.state
    let h3;
    let stripeContatiner;
    if (appointment) {
        h3 = <><h3>Total amount: ${appointment.price}</h3>
            <Button id="StripeButton" onClick={() => setShowItem(true)}>Purchase</Button>
        </>
        console.log("inside appointment");
        stripeContatiner = <><StripeContainer
            appointment={appointment}
            date={date}
            time={time}
            id={appointmentID} /></>

    } else if (amount) {
        h3 = <><h3>Total amount: ${amount}</h3>
            <Button id="StripeButton" onClick={() => setShowItem(true)}>Purchase</Button>
        </>
        console.log("inside amount");
        stripeContatiner = <><StripeContainer
            products={cart} /></>
    } else {
        console.log("inside error");
        h3 = <h3>Error</h3>
    }

    return (
        // <<<<<<< Updated upstream
        <Container className='my-4'>
            {showItem
                ?
                <>{stripeContatiner}</>
                :
                <> {h3}</>
            }
        </Container>
        /* =======
                <div>
        
                    {showItem ? <StripeContainer amount={amount} /> : <> <h3>${amount}</h3> <button onClick={() =>
                        setShowItem(true)}>Purchase</button></>}
                </div>
        >>>>>>> Stashed changes */
    );
}