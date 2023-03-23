import React from "react";
import { useLocation } from "react-router-dom";
import '../styles/NavBar.css';
import { logout } from "../firebase.js"
import { Container, Nav, Navbar, Button } from "react-bootstrap";

function NavigationBar() {
    const location = useLocation();

    return (
        <Container>
            <Navbar sticky="top" collapseOnSelect expand="md" className="navbar navbar-custom" variant="light">
            <Navbar.Brand href="/Home">Xango</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav">
                <Container>
                    <Nav className="justify-content-end">
                        <Nav.Item>
                            <Nav.Link href="/appointments">Book</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/Products">Products</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/HairPricing">Pricing</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/AboutUs">About Us</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Container>
                                {location.pathname === "/Admin" &&
                                    <Button size="md" variant="outline-dark" onClick={logout}>
                                        Logout
                                    </Button>
                                }
                            </Container>
                        </Nav.Item>
                    </Nav>
                </Container>
                
            </Navbar.Collapse>
            </Navbar>
        </Container>
        
    )
}

export default NavigationBar;