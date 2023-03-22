import React, { useState } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase';
import { Card, Container, Form, InputGroup, Button, ButtonGroup, Toast, ToastContainer, Modal } from "react-bootstrap"; 

const Service = ({arr}) => {
  const numberFormat = (value) => new Intl.NumberFormat('en-IN', {style: 'currency', currency: 'EUR'}).format(value);

  const [editServNameInput, setEditServNameInput] = useState("");
  const [editServPriceInput, setEditServPriceInput] = useState("");
  const [showEditNotif, setShowEditNotif] = useState(false);
  const [open, setOpen] = useState(false);

  const updateFunc = (e) => {
    e.preventDefault();
    const docRef = doc(db, "hairstylePrices", arr.id);

    if (editServNameInput === "" && editServPriceInput === ""){
      return;
    } else {
      if (editServNameInput === "" || editServPriceInput === ""){
        if (editServPriceInput === ""){
          updateDoc(docRef, { typeOfService: editServNameInput })
        }
        if (editServNameInput === ""){
          updateDoc(docRef, { servicePrice: editServPriceInput })
        }
      } else {
        updateDoc(docRef, {
          typeOfService: editServNameInput,
          servicePrice: editServPriceInput
        })
      }
    }

    setShowEditNotif(true);
    setEditServNameInput("");
    setEditServPriceInput("");
  }

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const confirmRemoval = () => {
    deleteDoc(doc(db, "hairstylePrices", arr.id))
  }

  return (
      <Container className="mt-4 mb-2 justify-content-md-center">
        {
          showEditNotif
          ? 
          (<ToastContainer className="p-3" containerPosition="fixed" position="top-end">
              <Toast onClose={() => setShowEditNotif(false)} show={showEditNotif} delay={5000} autohide>
                  <Toast.Header>
                      <strong className="me-auto">Atención!</strong>
                  </Toast.Header>
                  <Toast.Body>Servicio cambiado!</Toast.Body>
              </Toast>
          </ToastContainer>) 
          : 
          null
        }


        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{arr.item.typeOfService}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Precio de Servicio: {numberFormat(arr.item.servicePrice)}</Card.Subtitle>

            <Form>
                <InputGroup className="mb-3">
                    <Form.Control 
                        type="input" 
                        name='Service Name' 
                        value={editServNameInput}
                        placeholder={"Nuevo nombre de Servicio"} 
                        onChange={e => setEditServNameInput(e.target.value)}
                    />
                </InputGroup>
                
                <InputGroup className="mb-3">
                    <InputGroup.Text>€</InputGroup.Text>
                    <Form.Control 
                        type="input" 
                        name='Service Price' 
                        value={editServPriceInput}
                        placeholder={"00.00"} 
                        onChange={e => setEditServPriceInput(e.target.value)}
                    />
                </InputGroup>
            </Form>
              
              <ButtonGroup>
                  <Button variant="primary" onClick={updateFunc}>Cambiar Servicio</Button> {' '}
                  <Button variant="danger" onClick={handleClickOpen}>Eliminar Servicio</Button>
              </ButtonGroup>
          </Card.Body>
        </Card>

        <Modal show={open} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Advertencia!</Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Está seguro que quieres borrar este servicio?</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              No
            </Button>
            <Button variant="danger" onClick={confirmRemoval}>
              Borrar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
  )
}

export default Service;