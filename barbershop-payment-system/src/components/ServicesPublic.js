import React from "react";
import { Card, Container, Col } from "react-bootstrap"; 

const Service = ({arr}) => {
    return (
      <Container className="mt-4 mb-2 justify-content-md-center">
         <Col key={arr}>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src="https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png"/>
              <Card.Header style={{fontSize: '1.5rem'}}>
                {arr.item.typeOfService}
              </Card.Header>
              <Card.Body style={{fontSize: '1.2rem', fontWeight: 'bold'}}>
                €{arr.item.servicePrice}
              </Card.Body>
            </Card>  
         </Col>
      </Container>
    )
}

export default Service;