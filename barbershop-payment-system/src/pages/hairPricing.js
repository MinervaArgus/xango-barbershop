import React, { useState, useEffect } from "react";
import Service from "../components/Services";
import {collection, onSnapshot, query} from "firebase/firestore"
import { db } from "../firebase.js";

const q = query(collection(db, 'hairstylePrices'));


const HairPricing = () => {
    const [inputs, setInputs] = useState([]);
    
    useEffect(() => {
        onSnapshot(q, (snapshot) => {
            setInputs(snapshot.docs.map(doc => ({
                id: doc.id,
                item: doc.data()
            })))
        })
    }, []);

    return (
        <div>
            <h1>Pricing</h1>
            <ul>
                {inputs.map(item => <Service key = {item.id} arr = {item}/>)}
            </ul>
        </div>
    );
}

export default HairPricing;