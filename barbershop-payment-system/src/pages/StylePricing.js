import React, { useState, useEffect } from "react";
import Service from "../components/ServicesPublic";
import {collection, onSnapshot, query} from "firebase/firestore"
import { db } from "../Firebase.js";
import { Button, Container, Row } from "react-bootstrap";

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
        <Container>
            <h1 className="mt-3">Pricing and Services</h1>
            <Button className="my-2" type="link" variant="primary" href="/appointments">Make an appointment!</Button>

            <Container className="my-3">
                <Row xs="auto" md={2} lg={3} xl={4} className="g-4 justify-content-md-center">
                    {inputs.map(item => <Service key = {item.id} arr = {item}/>)}
                </Row>
            </Container>
        </Container>
    );
}

export default HairPricing;