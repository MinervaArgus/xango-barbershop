import React from "react";
import { useLocation } from "react-router-dom";
import '../styles/NavBar.css';
import { logout } from "../Firebase.js"
import { Container, Nav, Navbar, Button } from "react-bootstrap"; 

function NavigationBar () {
    const location = useLocation();
    
    return (
        <Navbar sticky="top" collapseOnSelect expand="lg" className="navbar navbar-custom" variant="light">
            <Container>
                <Navbar.Brand href="/Home">Xango</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Nav.Item>
                            <Nav.Link href="/appointments">Book Appointment</Nav.Link>    
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/HairStyles">View Styles</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/Products">View Products</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/HairPricing">View Pricing</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/AboutUs">About Us</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Container>
                                {(location.pathname !== "/AdminLogin" && location.pathname !== "/Admin") && 
                                    <Button href="/AdminLogin" size="md" variant="outline-dark">
                                        Admin Dashboard
                                    </Button>
                                }
                                {location.pathname === "/Admin" &&
                                        <Button size="md" variant="outline-dark" onClick={logout}>
                                            Logout
                                        </Button>
                                }
                            </Container>
                        </Nav.Item>
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

export default NavigationBar;