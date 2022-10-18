import React from "react";
import Button from '@mui/material/Button';
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../components/global-state/userStateSlice";

function Navbar ({ history }) {
    const { userLoggedIn } = useSelector((state) => state.userState);
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout(false));
        history.push("/");
    };

    return (<nav className="nav">
        <a href="/home" className="site-title">Xango</a>
        <ul>
            <li>
                <a href="/appointments">Book Appointment</a>
            </li>   
            <li>
            {!userLoggedIn && (
                <a href="/AdminLogin">Admin</a>
            )}
            {userLoggedIn ? (
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 1}} onClick={logoutHandler}>
                    Log Out
                </Button>
            ) : null}
            </li>
        </ul>
    </nav >
    )
}

export default withRouter(Navbar);