import React from "react";
import Button from '@mui/material/Button';

export default function Navbar() {
    return (<nav className="nav">
        <a href="/home" className="site-title">Xango</a>
        <ul>
            <li>
                <a href="/appointments">Book Appointment</a>
            </li>
            <li>
                <a href="/AdminLogin">Admin</a>
            </li>
            <li>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Log Out
                </Button>
            </li>
        </ul>
    </nav >
    )
}