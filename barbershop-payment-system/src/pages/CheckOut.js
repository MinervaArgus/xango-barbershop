import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import StripeContainer from '../components/StripeContainer';
import "../styles/StripeStyle.css";
import { Container, Button } from 'react-bootstrap'


export default function CheckOut() {
    const [showItem, setShowItem] = useState(false)
    const [isAppointment, setIsAppointment] = useState(false);
    const location = useLocation()
    const { appointment, date, time, appointmentID, amount, cart } = location.state
    let h3;
    let stripeContatiner;
    function appointmentCase() {
        setShowItem(true);
        setIsAppointment(true);
    }
    function productsCase() {
        setShowItem(true);
        setIsAppointment(false);
    }
    if (appointment) {
        h3 = <><h3>Total amount: ${appointment.price}</h3>
            <Button id="StripeButton" onClick={() => appointmentCase()}>Purchase</Button>
        </>
        console.log("inside appointment");
        /* stripeContatiner = <><StripeContainer
            appointment={appointment}
            date={date}
            time={time}
            id={appointmentID} /></> */

    } else if (amount) {
        h3 = <><h3>Total amount: ${amount}</h3>
            <Button id="StripeButton" onClick={() => productsCase()}>Purchase</Button>
        </>
        console.log("inside amount");
        /* stripeContatiner = <><StripeContainer
            products={cart} /></> */
    } else {
        console.log("inside error");
        h3 = <h3>Error</h3>
    }

    return (
        // <<<<<<< Updated upstream
        <Container className='my-4'>
            {showItem
                ? <>
                    {isAppointment
                        ?
                        <StripeContainer
                            appointment={appointment}
                            date={date}
                            time={time}
                            id={appointmentID} />
                        :
                        <StripeContainer
                            products={cart} />
                    }</>
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