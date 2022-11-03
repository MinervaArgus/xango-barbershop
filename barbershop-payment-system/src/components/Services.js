import React from "react";
import { List , ListItem, ListItemAvatar, ListItemText, Typography, EditIcon } from '@mui/material';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import serviceEditPrice from '../pages/Admin';

const Service = ({arr}) => {
  const updateFunc = (e) => {
    e.preventDefault();
    const docRef = doc(db, "hairstylePrices", arr.id);

    updateDoc(docRef, {servicePrice: serviceEditPrice})
  }

  return (
      <List className="todo-list">
          <ListItem>
              <ListItemAvatar id="list-item"/>
              <ListItemText
              primary={arr.item.typeOfService}
              secondary={
                  <React.Fragment>
                    <Typography component="span" variant="body1">
                      Service Price: €{arr.item.servicePrice}
                    </Typography>
                  </React.Fragment>
                }
                />
          </ListItem>
      </List>
  )
}

export default Service;