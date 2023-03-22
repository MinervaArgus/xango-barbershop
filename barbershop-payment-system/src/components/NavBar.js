import React from "react";
import { useLocation } from "react-router-dom";
import '../styles/NavBar.css';
import { logout } from "../firebase.js"
import { Container, Nav, Navbar, Button } from "react-bootstrap";

function NavigationBar() {
    const location = useLocation();

    return (
        <Navbar sticky="top" collapseOnSelect expand="lg" className="navbar navbar-custom" variant="light">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center">
                <Nav>
                    <Nav.Item>
                        <Nav.Link href="/appointments">Book Appointment</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/Products">View Products</Nav.Link>
                    </Nav.Item>
                    <Navbar.Brand href="/Home">Xango</Navbar.Brand>
                    <Nav.Item>
                        <Nav.Link href="/HairPricing">View Pricing</Nav.Link>
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
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar;