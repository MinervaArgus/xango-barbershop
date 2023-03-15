import React, { useState, useEffect } from "react";
import { ref, getDownloadURL, getStorage ,listAll, deleteObject } from "firebase/storage";
import { Card, Container, Col, Row, Button } from "react-bootstrap";

function AdminStyles() {
    const [imageUrls, setImageUrls] = useState([])
    const storage = getStorage();
    const imagesListRef = ref(storage, "images/Hairstyles");
    
    useEffect(() => {
      listAll(imagesListRef).then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setImageUrls((prev) => [...prev, url]);
          });
        });
      });
      // eslint-disable-next-line
    }, []);

    const deleteObj = async (e) => {
      await deleteObject(ref(storage, e))
      window.location.reload(false);
    }
  
    return(
          <Row xs="auto" md="auto" lg="auto" xl="auto" className="mt-2 g-4 justify-content-md-center">
              {imageUrls && imageUrls.map((url) => {
                return(
                  <Container className="mt-4 mb-2 justify-content-md-center">
                    <Col>
                        <Card style={{ width: '18rem' }}>
                          <Card.Img style={{width: "100%", height: "18rem", objectFit: "contain"}} variant="top" src={url} key={url}/>
                          <Card.Body>
                            <Button variant="primary" onClick={() => deleteObj(url)}>Delete Image</Button>
                          </Card.Body>
                        </Card>  
                    </Col>
                 </Container>
                );
              })}
          </Row>
      
    )
}

export default AdminStyles;