import React, { useEffect, useState } from "react";
import '../styles/Admin.css';
import { useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { storage, db, auth } from "../Firebase.js"
import Service from "../components/Services";
import AdminStyles from "../components/AdminStyles";
import { ref, uploadBytesResumable } from "firebase/storage";
import { collection, onSnapshot, query, addDoc, orderBy } from "firebase/firestore"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Container, Form, Button, Toast, ToastContainer, Row, Col, InputGroup } from "react-bootstrap";

const q = query(collection(db, 'hairstylePrices'), orderBy('typeOfService'));

function Admin() {
    const [inputs, setInputs] = useState([]);
    const [serviceInput, setServInput] = useState("");
    const [servPriceInput, setServPriceInput] = useState("");
    const [user, loading] = useAuthState(auth);
    const [date, setDate] = useState(new Date()); //date state
    const [showNotif, setShowNotif] = useState(false);
    const [showFileNotif, setShowFileNotif] = useState(false);
    const [showAddNotif, setShowAddNotif] = useState(false);
    const [file, setFile] = useState(null);
    const history = useHistory();

    const current = new Date();
    let currentDate = current.toJSON();
    const todaysDate = currentDate.slice(0, 10);

    let [filename, setFileName] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const fileTarget = file;
        if (!fileTarget) return;
        const storageRef = ref(storage, `images/Hairstyles/${fileTarget.name}`);
        const uploadTask = uploadBytesResumable(storageRef, fileTarget);

        uploadTask.on("state_changed",
        (snapshot) => {},
        (error) => {
            alert(error);
        },
        () => { setShowFileNotif(true) });
    }

    useEffect(() => {
        if (loading) return;
        if (!user) {
            history.push("/AdminLogin");
            window.location.reload(false);
        }

        onSnapshot(q, (snapshot) => {
            setInputs(snapshot.docs.map(doc => ({
                id: doc.id,
                item: doc.data()
            })))
        })
    }, [serviceInput, servPriceInput, user, loading, history]);

    const handleServSubmit = (e) => {
        e.preventDefault();
        addDoc(collection(db, 'hairstylePrices'), {
            typeOfService: serviceInput,
            servicePrice: servPriceInput
        })
        setShowAddNotif(true);
        setServInput("");
        setServPriceInput("00.00");
        
    };

    const changeHandler = (e) => {
        if (e.target.files.length > 0) {
            filename = e.target.files[0].name;
            setFileName(filename);
            setFile(e.target.files[0])
        } else return;
    } 
    
    const addDayClosed = async (e) => {
        e.preventDefault();
        await addDoc(collection(db, 'daysClosed'), {
            date: date
        })
        setShowNotif(true);
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container>
            {
                showNotif
                ? 
                (<ToastContainer className="p-3" containerPosition="fixed" position="top-end">
                    <Toast onClose={() => setShowNotif(false)} show={showNotif} delay={5000} autohide>
                        <Toast.Header>
                            <strong className="me-auto">Attention!</strong>
                        </Toast.Header>
                        <Toast.Body>Barbershop will be closed on {date}</Toast.Body>
                    </Toast>
                </ToastContainer>) 
                : 
                null
            }

            {
                showFileNotif
                ? 
                (<ToastContainer className="p-3" containerPosition="fixed" position="top-end">
                    <Toast onClose={() => setShowFileNotif(false)} show={showFileNotif} delay={5000} autohide>
                        <Toast.Header>
                            <strong className="me-auto">Attention!</strong>
                        </Toast.Header>
                        <Toast.Body>Image Uploaded!</Toast.Body>
                    </Toast>
                </ToastContainer>) 
                : 
                null
            }

            {
                showAddNotif
                ? 
                (<ToastContainer className="p-3" containerPosition="fixed" position="top-end">
                    <Toast onClose={() => setShowAddNotif(false)} show={showAddNotif} delay={5000} autohide>
                        <Toast.Header>
                            <strong className="me-auto">Atención!</strong>
                        </Toast.Header>
                        <Toast.Body>Servicio agregado!</Toast.Body>
                    </Toast>
                </ToastContainer>) 
                : 
                null
            }

            <h1>Admin Dashboard</h1>

            <Container>
                <Form>
                    <Row className="justify-content-md-center">
                        <Col xs md={7} lg={5}>
                            <Form.Label column="lg">
                                Set a date to be closed
                            </Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control 
                                    type="date" 
                                    name='Date' 
                                    required pattern="\d{4}-\d{2}-\d{2}" 
                                    value={date}
                                    placeholder={todaysDate}
                                    min={todaysDate} 
                                    onChange={(e) => setDate(e.target.value)}
                                />
                                <Button as="input" type="submit" onClick={addDayClosed} value="Submit"/>
                            </InputGroup>
                        </Col>
                    </Row>
                </Form>
            </Container>

            <Container>
                <Row className="justify-content-md-center">
                    <Col xs md={7} lg={5}>
                        <Form.Label column="lg">
                            Upload Hair Styles
                        </Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control type="file" accept="image/*" onChange={changeHandler}/>
                            <Button variant="primary" type='submit' onClick={handleSubmit}>Upload</Button>
                        </InputGroup>
                    </Col>
                </Row>
            </Container>

            <Container className="mt-2 mb-2">
                <h5>Remove Images</h5>
                <h6>(Browser will refresh!)</h6>
                <AdminStyles/>
            </Container>

            <Container className="mt-4 mb-2">
                <Form>
                    <Row className="justify-content-md-center">
                        <Col xs md={6} lg={5}>
                            <Form.Label column="lg">
                                Add Service
                            </Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control 
                                    type="input" 
                                    name='Service Name' 
                                    value={serviceInput}
                                    placeholder={"Nombre de Servicio"} 
                                    onChange={(e) => setServInput(e.target.value)}
                                />
                            </InputGroup>
                            <InputGroup>
                                <InputGroup.Text>€</InputGroup.Text>
                                <Form.Control 
                                    type="input" 
                                    name='Service Price' 
                                    value={servPriceInput}
                                    placeholder={"00.00"} 
                                    onChange={(e) => setServPriceInput(e.target.value)}
                                />
                                <Button as="input" type="submit" onClick={handleServSubmit} value="Agregar Servicio"/>
                            </InputGroup>
                        </Col>
                    </Row>
                </Form>
            </Container>

            <Container>
                <h5 className="mt-4">List of Services and Prices</h5>
                <Container className="mt-4 mb-2">
                    <Row xs="auto" md={2} lg={3} xl={4} className="g-4 justify-content-md-center">
                        {inputs.map(item => <Service key = {item.id} arr = {item}/>)}
                    </Row>
                </Container>
                
            </Container>
        </Container>
        </LocalizationProvider>
    );
}

export default Admin;