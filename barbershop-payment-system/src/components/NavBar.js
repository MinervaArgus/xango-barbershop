import React from "react";

export default function Navbar() {
    return (<nav className="nav">
        <a href="/home" className="site-title">Xango</a>
        <ul>
            <li>
                <a href="/appointments">Book Appointment</a>
            </li>
            <li>
                <a href="/admin">Admin</a>
            </li>
            <li>
                <a href="/location">Location</a>
            </li>

        </ul>
    </nav >
    )
}