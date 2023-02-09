import React, { useState } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../Firebase';
import { Card, Container, Form, InputGroup, Button, ButtonGroup, Modal } from "react-bootstrap"; 

const Service = ({arr}) => {
  const numberFormat = (value) => new Intl.NumberFormat('en-IN', {style: 'currency', currency: 'EUR'}).format(value);

  const [editServNameInput, setEditServNameInput] = useState("");
  const [editServPriceInput, setEditServPriceInput] = useState("");
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

    setEditServNameInput("");
    setEditServPriceInput("");
  }

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const confirmRemoval = () => {
    deleteDoc(doc(db, "hairstylePrices", arr.id))
  }

  return (
      <Container className="mt-4 mb-2 justify-content-md-center">
          <Card style={{ width: '19rem' }}>
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
      </Container>


    // Use <Modal>

    //     <Dialog
    //       open={open}
    //       onClose={handleClose}
    //       aria-labelledby="alert-dialog-title"
    //       aria-describedby="alert-dialog-description"
    //     >
    //       <DialogTitle id="alert-dialog-title">
    //         {"Are you sure you want to remove: "}
    //       </DialogTitle>
    //       <DialogContent>
    //         <DialogContentText id="alert-dialog-description">
    //           You will have to manually add <b>"{arr.item.typeOfService}"</b> and it's 
    //           price: <b>"{numberFormat(arr.item.servicePrice)}"</b> if you want to undo your changes.
    //         </DialogContentText>
    //       </DialogContent>
    //       <DialogActions>
    //         <Button onClick={handleClose}>Go Back</Button>
    //         <Button onClick={confirmRemoval} autoFocus>
    //           Confirm
    //         </Button>
    //       </DialogActions>
    //     </Dialog>
  )
}

export default Service;