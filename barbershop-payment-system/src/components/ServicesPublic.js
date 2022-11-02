import React from "react";
import { List , ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

const Service = ({arr}) => {
    return (
        <List className="todo-list">
            <ListItem>
                <ListItemAvatar id="list-item"/>
                <ListItemText
                primary={arr.item.typeOfService}
                secondary={
                    <React.Fragment>
                      <Typography component="span" variant="body1">
                        Service Price: {arr.item.servicePrice}
                      </Typography>
                    </React.Fragment>
                  }
                 />
            </ListItem>
        </List>
    )
}

export default Service;