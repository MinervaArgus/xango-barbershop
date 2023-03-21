import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { storage, db, auth } from "../Firebase.js"
import moment from "moment";
import { Calendar, momentLocalizer } from 'react-big-calendar'
import Service from "../components/Services";
import AdminStyles from "../components/AdminStyles";
import { ref, uploadBytesResumable } from "firebase/storage";
import { collection, onSnapshot, query, addDoc, orderBy } from "firebase/firestore"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Container, Form, Button, Toast, ToastContainer, Row, Col, InputGroup, Tab, Tabs, Modal } from "react-bootstrap";
import 'react-big-calendar/lib/css/react-big-calendar.css';

require('moment/locale/es.js')
const localizer = momentLocalizer(moment);
const q = query(collection(db, 'hairstylePrices'), orderBy('typeOfService'));
const q2 = query(collection(db, 'appointments'));

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
    const [calendarAppointments, setCalendarAppointments] = useState([{
        id: '',
        title: 'test35',
        start: new Date(2022, 9, 19, 15, 30, 0), end: new Date(2022, 9, 19, 17, 30, 0)
    }]); //filtered appointments

    const current = new Date();
    let currentDate = current.toJSON();
    const todaysDate = currentDate.slice(0, 10);
    // console.log(date);

    let [filename, setFileName] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const fileTarget = file;
        if (!fileTarget) return;
        const storageRef = ref(storage, `images/Hairstyles/${fileTarget.name}`);
        const uploadTask = uploadBytesResumable(storageRef, fileTarget);

        uploadTask.on("state_changed",
            (snapshot) => { },
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
        // console.log(date.toJSON().slice(0,10));
        if (new Date(date).toJSON().slice(0, 10) !== todaysDate) {
            console.log("adding date: " + date);
            await addDoc(collection(db, 'daysClosed'), {
                date: date
            })
            setShowNotif(true);
        }
    }

    function formatEndDate(d, t) {
        let hour = t.slice(0.2);
        let minutes = t.slice(3, 5);
        let weekDay = new Date(d).getDay();
        let newHour = 0;
        if (weekDay === 2 || weekDay === 3) {
            if (parseInt(hour) <= 13) {
                if (minutes === '30') {
                    newHour = parseInt(hour) + 1;
                } else if (minutes === '00') {
                    //to be implemented
                }
            } else {
                newHour = parseInt(hour);
            }
        } else if (weekDay === 4 || weekDay === 5) {
            if (parseInt(hour) <= 16) {
                if (minutes === '30') {
                    newHour = parseInt(hour) + 1;
                } else if (minutes === '00') {
                    //to be implemented
                }
            }
        } else if (weekDay === 6) {
            if (parseInt(hour) <= 11) {
                if (minutes === '30') {
                    newHour = parseInt(hour) + 1;
                } else if (minutes === '00') {
                    //to be implemented
                }
            }
        }//end of if
        // console.log("finished product: " + d + " " + newHour.toString() + ":" + minutes);
        return d + " " + newHour.toString() + ":" + minutes;
    }

    useEffect(() => {
        //get all appointments from db
        onSnapshot(q2, (snapshot) => {
            setCalendarAppointments(snapshot.docs.map(doc => ({
                // ...calendarAppointments,
                id: doc.id,
                title: doc.data().name,
                start: new Date(doc.data().date + " " + doc.data().time),
                end: new Date(formatEndDate(doc.data().date, doc.data().time))
            })))
        })
    }, []);
    console.log("calendar appointments: ", calendarAppointments);


    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleEventClick = (event) => {
        setShowModal(true);
        setSelectedEvent(event);
    };
    const minTime = new Date();
    minTime.setHours(9, 0, 0); // Set minimum time to 8:00 AM today
    const maxTime = new Date();
    maxTime.setHours(19, 0, 0); // Set maximum time to 6:00 PM today
    // const handleClose = () => setOpenModal(false);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container className="my-3">

                {
                    showNotif
                        ?
                        (<ToastContainer className="p-3" containerPosition="fixed" position="top-end">
                            <Toast onClose={() => setShowNotif(false)} show={showNotif} delay={5000} autohide>
                                <Toast.Header>
                                    <strong className="me-auto">Attention!</strong>
                                </Toast.Header>
                                <Toast.Body>Barbershop will be closed on {new Date(date).toLocaleDateString()}</Toast.Body>
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

                <Tabs
                    defaultActiveKey={"adminCalendar"}
                    id="uncontrolled-admin-tab"
                    className="my-3"
                    justify
                >
                    <Tab eventKey={"adminCalendar"} title="View Calendar">
                        <Container className="my-4">

                            <Calendar
                                localizer={localizer}
                                events={calendarAppointments}
                                defaultDate={new Date()}
                                defaultView="week"
                                style={{ height: "80vh" }}
                                min={minTime}
                                max={maxTime}
                                onSelectEvent={handleEventClick}
                                messages={{
                                    next: ">",
                                    previous: "<",
                                    today: "Hoy",
                                    month: "Mes",
                                    week: "Semana",
                                    day: "Día"
                                }}
                            />
                            {selectedEvent && (
                                <Modal show={showModal} onHide={() => setShowModal(false)}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>{selectedEvent.title}</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <p>De: {selectedEvent.start.toString().slice(16, 21)}</p>
                                        <p>A: {selectedEvent.end.toString().slice(16, 21)}</p>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                                            Close
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            )}
                        </Container>
                    </Tab>
                    <Tab eventKey={"dateClosed"} title="Add Close Date">
                        <Container>
                            <Form>
                                <Row className="justify-content-md-center">
                                    <Col xs md="auto" lg="auto">
                                        <Form.Label column="lg">
                                            Set a date to be closed
                                        </Form.Label>
                                        <InputGroup className="mb-3">
                                            <Form.Control
                                                type="date"
                                                name='Date'
                                                required
                                                value={date}
                                                placeholder={date}
                                                min={todaysDate}
                                                onChange={(e) => setDate(e.target.value)}
                                            />
                                            <Button as="input" type="submit" onClick={addDayClosed} value="Submit" />
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                    </Tab>

                    <Tab eventKey={"uploadHair"} title="Upload Styles">
                        <Container>
                            <Row className="justify-content-md-center">
                                <Col xs md="auto" lg="auto">
                                    <Form.Label column="lg">
                                        Upload Hair Styles
                                    </Form.Label>
                                    <InputGroup className="mb-3">
                                        <Form.Control type="file" accept="image/*" onChange={changeHandler} />
                                        <Button variant="primary" type='submit' onClick={handleSubmit}>Upload</Button>
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Container>
                    </Tab>

                    <Tab eventKey={"deleteStyle"} title="Remove Styles">
                        <Container className="mt-2 mb-2">
                            <h5>Remove Images</h5>
                            <h6>(Browser will refresh!)</h6>
                            <AdminStyles />
                        </Container>
                    </Tab>

                    <Tab eventKey={"addService"} title="Add Service">
                        <Container className="mt-4 mb-2">
                            <Form>
                                <Row className="justify-content-md-center">
                                    <Col xs md="auto" lg="auto" xl="auto">
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
                                            <Button as="input" type="submit" onClick={handleServSubmit} value="Agregar Servicio" />
                                        </InputGroup>
                                    </Col>
                                </Row>
                            </Form>
                        </Container>
                    </Tab>

                    <Tab eventKey={"editService"} title="Edit Services">
                        <Container>
                            <h5 className="mt-4">List of Services and Prices</h5>
                            <Container className="mt-4 mb-2">
                                <Row xs="auto" md="auto" lg="auto" xl="auto" className="g-4 justify-content-md-center">
                                    {inputs.map(item => <Service key={item.id} arr={item} />)}
                                </Row>
                            </Container>
                        </Container>
                    </Tab>



                </Tabs>
            </Container>
        </LocalizationProvider>
    );
}

export default Admin;