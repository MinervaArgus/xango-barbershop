import React, { useState, useEffect } from "react";
import Service from "../components/ServicesPublic";
// import { collection, onSnapshot, query } from "firebase/firestore"
// import { db } from "../firebase.js";
import { Button, Container, Row } from "react-bootstrap";
import axios from "axios";
// const q = query(collection(db, 'hairstylePrices'));

const HairPricing = () => {
    const [inputs, setInputs] = useState([]);
    const [error, setError] = useState(false);
    useEffect(() => {
        /* onSnapshot(q, (snapshot) => {
            setInputs(snapshot.docs.map(doc => ({
                id: doc.id,
                item: doc.data()
            })))
        }) */
        axios.get('http://35.180.115.132:4000/api/getServices')
            .then(res => {
                console.log("response: ", res);

                if (res.status === 200) {
                    /* res.data.map(service => {
                        console.log("each service: ", service.typeOfService)
                    }); */
                    setInputs(res.data.map(service => ({
                        typeOfService: service.typeOfService,
                        servicePrice: service.servicePrice
                    })));
                    setError(false);
                } else if (res.status === 500) {
                    setError(true);
                }

            });
    }, []);
    console.log("inputs state: ", inputs);
    return (
        <Container>
            <h1 className="mt-3">Pricing and Services</h1>
            <Button className="my-2" type="link" variant="primary" href="/appointments">Make an appointment!</Button>

            <Container className="my-3">
                <Row xs="auto" md={2} lg={3} xl={4} className="g-4 justify-content-md-center">
                    {inputs.map((item, index) => <Service key={index} arr={item} />)}
                </Row>
            </Container>
        </Container>
    );
}

export default HairPricing;