import React from "react";
import { Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import '../styles/NavBar.css';
import { logout } from "../firebase.js"

function Navbar () {
    const location = useLocation();

    return (
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
    )
}

export default Navbar;