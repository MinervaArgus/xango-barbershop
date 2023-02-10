import React from "react";
import { useState, useEffect } from "react";
import { ref, getDownloadURL, getStorage, listAll } from "firebase/storage";
import '../styles/Products.css';
import { FaShoppingCart } from "react-icons/fa";
import { Container, Card, Row, Col, Modal, Button, Toast, ToastContainer } from 'react-bootstrap';

const products = [
  { id: 1, name: "Product 1", price: 10.00 },
  { id: 2, name: "Product 2", price: 20.00 },
  { id: 3, name: "Product 3", price: 30.00 },
];

function Products() {
  const [imageUrls, setImageUrls] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showAddNotif, setShowAddNotif] = useState(false);
  const storage = getStorage();
  const imagesListRef = ref(storage, "images/Products/");


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

  const addToCart = (product) => {
    setCart([...cart, product]);
    setShowAddNotif(true);
  }

  const handleClose = () => setShowCart(false);

  const total = cart.reduce((acc, product) => acc + product.price, 0);

  return(
    <Container className="my-3">
      <h1>Products</h1>

      <Container className="my-3" id="Product-Images">
        <Row xs="auto" md={2} lg={3} xl={4} className="g-4 justify-content-md-center">
          {imageUrls && imageUrls.map((url, index) => {
            return (
              <Container className="mt-4 justify-content-md-center">
                <Col key={url}>
                  <Card style={{width: "18rem"}}>
                    <Card.Img style={{width: "100%", height: "18rem", objectFit: "contain"}} variant="top" src={url}/>
                    <Card.Header style={{fontSize:"1.5rem"}}>
                      {products[index].name}
                    </Card.Header>
                    <Card.Body style={{fontSize:"1.25rem"}}>
                          €{products[index].price}
                        <Row className="mt-3">
                          <Button onClick={() => addToCart(products[index])}>
                              <FaShoppingCart/>
                              Add to cart
                          </Button>
                        </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Container>
            );
          })}
        </Row>
      </Container>
      
      <Button size="lg" style={{position:"fixed", right:0, bottom:0}} className="m-3" variant="primary" onClick={() => setShowCart(true)}><FaShoppingCart /> Cart</Button>
      
      {
          showAddNotif
          ? 
          (<ToastContainer className="p-3" containerPosition="fixed" position="top-center">
              <Toast onClose={() => setShowAddNotif(false)} show={showAddNotif} delay={5000} autohide>
                  <Toast.Body>Added to Cart!</Toast.Body>
              </Toast>
          </ToastContainer>) 
          : 
          null
      }


      <Modal show={showCart} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Shopping Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body className="mx-2">
              {cart.map((product) => (
                  <Row className="m-1" key={product.id}>
                    {product.name} - €{product.price}
                  </Row>
              ))}
          </Modal.Body>
          <Modal.Footer style={{textAlign: "left"}}>
            <Col className="mx-2">Total: €{total.toFixed(2)}</Col>
            
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">
              Checkout
            </Button>
          </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Products;

