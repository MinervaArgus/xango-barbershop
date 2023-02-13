import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import StripeContainer from '../components/StripeContainer';


export default function CheckOut() {
    const [showItem, setShowItem] = useState(false)
    const location = useLocation()
    const { amount } = location.state
    return (
        <div>
            {showItem ? <StripeContainer amount={amount} /> : <> <h3>${amount}</h3> <button onClick={() =>
                setShowItem(true)}>Purchase</button></>}
        </div>
    );
}