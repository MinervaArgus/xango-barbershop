import React, { useState } from "react";
import { List , ListItem, ListItemAvatar, ListItemText, Typography, TextField, Button, Box } from '@mui/material';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';

const Service = ({arr}) => {
  const numberFormat = (value) => new Intl.NumberFormat('en-IN', {style: 'currency', currency: 'EUR'}).format(value);

  const [editServNameInput, setEditServNameInput] = useState("");
  const [editServPriceInput, setEditServPriceInput] = useState(0);

  const updateFunc = (e) => {
    e.preventDefault();
    const docRef = doc(db, "hairstylePrices", arr.id);
    updateDoc(docRef, {
      typeOfService: editServNameInput,
      servicePrice: editServPriceInput
    })
    setEditServNameInput("");
    setEditServPriceInput(0);
  }

  return (
    <Box>
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
      </List>
    </Box>
  )
}

export default Service;