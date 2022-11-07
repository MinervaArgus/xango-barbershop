import React, { useState } from "react";
import { List , ListItem, ListItemAvatar, ListItemText, Typography, TextField, Button, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase';

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
    <Box
      display="flex" 
      width="auto" height="auto" 
      alignItems="center"
      justifyContent="center"
    >
      <List className="todo-list">
        <ListItem>
            <ListItemAvatar id="list-item"/>
            <ListItemText
              primary={arr.item.typeOfService}
              secondary={
                  <React.Fragment>
                    <Typography component="span" variant="body1">
                      Service Price: {numberFormat(arr.item.servicePrice)}
                    </Typography>
                  </React.Fragment>
                }
              />
        </ListItem>

        <TextField id="outlined-basic" label="Service Name" variant="outlined" value={editServNameInput} InputLabelProps={{shrink: true}} onChange={e => setEditServNameInput(e.target.value)}/>
        <TextField id="outlined-basic" label="Service Price" variant="outlined" value={editServPriceInput} InputLabelProps={{shrink: true}} onChange={e => setEditServPriceInput(e.target.value)}/>
        
        <Button variant="contained" onClick={updateFunc}>Edit Service</Button>
        <Button variant="contained" onClick={handleClickOpen}>Remove Service</Button>
        
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to remove: "}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You will have to manually add <b>"{arr.item.typeOfService}"</b> and it's 
              price: <b>"{numberFormat(arr.item.servicePrice)}"</b> if you want to undo your changes.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Go Back</Button>
            <Button onClick={confirmRemoval} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </List>
    </Box>
  )
}

export default Service;