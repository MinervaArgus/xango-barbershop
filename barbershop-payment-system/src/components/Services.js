import React, { useState } from "react";
import { List , ListItem, ListItemAvatar, ListItemText, Typography, TextField, Button, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../Firebase';
import { Col, Card, Row, Container, Form, InputGroup } from "react-bootstrap"; 

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
      <Container className="mt-4 mb-2">
        <Row xs md={2} lg={3} xl={4} className="g-4 justify-content-md-center">
          <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>{arr.item.typeOfService}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Precio de Servicio: {numberFormat(arr.item.servicePrice)}</Card.Subtitle>

                <Form>
                    <Row className="justify-content-md-center">
                        <Col xs md={6} lg={5}>
                            <InputGroup className="mb-3">
                                <Form.Control 
                                    type="input" 
                                    name='Service Name' 
                                    value={editServNameInput}
                                    placeholder={"Nuevo nombre de Servicio"} 
                                    onChange={e => setEditServNameInput(e.target.value)}
                                />
                            </InputGroup>
                            
                            <InputGroup>
                                <InputGroup.Text>€</InputGroup.Text>
                                <Form.Control 
                                    type="input" 
                                    name='Service Price' 
                                    value={editServPriceInput}
                                    placeholder={"00.00"} 
                                    onChange={e => setEditServPriceInput(e.target.value)}
                                />
                            </InputGroup>
                        </Col>
                    </Row>
                  </Form>
                  <Button as="input" type="submit" onClick={handleClickOpen} value="Eliminar Servicio"/>
                  <Button type="submit" onClick={updateFunc} value="Cambiar Servicio"/>

              </Card.Body>
            </Card>
          </Col>
        </Row>
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