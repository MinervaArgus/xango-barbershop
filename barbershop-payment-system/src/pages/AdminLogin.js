import React, {useState} from 'react';
import { useHistory, useLocation } from "react-router-dom";
import {Avatar, Button, CssBaseline, TextField, Box, Typography, Container, createTheme, ThemeProvider } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useSelector, useDispatch } from "react-redux";
import { updateUserStatus } from "../components/global-state/userStateSlice";
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebase';

const theme = createTheme();

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const location = useLocation();
  const { userLoggedIn } = useSelector((state) => state.userState);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    function onRegister() {

      
      // signInWithEmailAndPassword(auth, email, password)
      //   .then((userCredential) => {
      //     const user = userCredential.user;
      //     history.go("/Admin");
      //     console.log("logged in")
      //   })
      //   .catch((error) => {
      //     const errorCode = error.code;
      //     const errorMessage = error.message;

      //     console.log(errorCode, errorMessage);
      //   })

        
      if ((email === "crismartin994@gmail.com" && password === "488592Is")) {
        dispatch(updateUserStatus(true));
      }
      
    }
    onRegister();
  };
  
  if (userLoggedIn) history.push(location.state ? location.state.from.pathname : "/Admin");
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}