import React from "react";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import '../styles/NavBar.css';
import { logout } from "../Firebase.js"
import { Container, Nav } from "react-bootstrap"; 

function Navbar () {
    const location = useLocation();

    return (
        <Navbar sticky="top" collapseOnSelect expand="lg" className="navbar navbar-custom" variant="light">
            <Container>
                <Navbar.Brand href="/Home">Barbershop Test Cart</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Link href="/appointments">Buy Products</Nav.Link>
                        <Button size="lg" className="me-auto" variant="outline-dark"> Cart Items</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    /*
    <nav className="nav">
        <a href="/Home" className="site-title">Xango</a>
        <ul>
            <li>
                <a href="/appointments">Book Appointment</a>
            </li>
            <li>
                <a href="/HairStyles">View Styles</a>
            </li>
            <li>
                <a href="/HairPricing">View Pricing</a>
            </li>
            <li>
                <a href="/AboutUs">About Us</a>
            </li>
            {(location.pathname !== "/AdminLogin" && location.pathname !== "/Admin") && 
                <li>
                    <a href="/AdminLogin">Admin Dashboard</a>
                </li>
            }
            {location.pathname === "/Admin" &&
                <Button variant="contained" onClick={logout}>
                    Logout
                </Button>
            }
            
        </ul>
    </nav>
    */
    )
}

export default Navbar;