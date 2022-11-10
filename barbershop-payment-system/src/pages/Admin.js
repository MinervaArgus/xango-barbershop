import React, { useEffect, useState } from "react";
import '../styles/Admin.css';
import { useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { storage, db, auth } from "../Firebase.js"
import Service from "../components/Services";
import ProgressBar from "../components/ProgressBar";
import AdminStyles from "../components/AdminStyles";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { TextField, Button, Box } from "@mui/material";
import { collection, onSnapshot, query, addDoc, orderBy } from "firebase/firestore"
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// https://mui.com/material-ui/react-drawer/#persistent-drawer
/*
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function PersistentDrawerRight() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            Persistent drawer
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}>
        <DrawerHeader />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
*/

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const q = query(collection(db, 'hairstylePrices'), orderBy('typeOfService'));

function Admin() {
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [inputs, setInputs] = useState([]);
    const [serviceInput, setServInput] = useState("");
    const [servPriceInput, setServPriceInput] = useState("");
    const history = useHistory();
    const [user, loading] = useAuthState(auth);
    const [date, setDate] = useState(new Date()); //date state

    let [filename, setFileName] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const file = e.target[0]?.files[0]
        if (!file) return;
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed",
        (snapshot) => {
            const progress =
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgresspercent(progress);
        },
        (error) => {
            alert(error);
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgUrl(downloadURL)
            });}
            );
    }

    useEffect(() => {
        if (loading) return;
        if (!user) {
            history.push("/AdminLogin");
            window.location.reload(false);
        }

        onSnapshot(q, (snapshot) => {
            setInputs(snapshot.docs.map(doc => ({
                id: doc.id,
                item: doc.data()
            })))
        })
    }, [serviceInput, servPriceInput, user, loading, history]);

    const handleServSubmit = (e) => {
        e.preventDefault();
        addDoc(collection(db, 'hairstylePrices'), {
            typeOfService: serviceInput,
            servicePrice: servPriceInput
        })
        setServInput("");
        setServPriceInput(0);
    };

    const changeHandler = (e) => {
        if (e.target.files.length > 0) {
            filename = e.target.files[0].name;
            setFileName(filename);
        }
    } 

    function formatDateNoTime(date) {
        var d = date.slice(5, 16);
        return d;
    }
    
    const addDayClosed = async (e) => {
        e.preventDefault();
        let s = formatDateNoTime(date.toString())
        await addDoc(collection(db, 'daysClosed'), {
            date: s
        })
        setSucces({ open: true });
    }
    let today = new Date();
    const handleDateChange = (e) => {
        setDate(e);
    }

    const [succes, setSucces] = useState({
        open: false
    });

    const { open } = succes;
    const handleClose = () => {
        setSucces({ ...succes, open: false });
    };


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div>
        {
                    succes ? (<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Day to be Closed added!
                        </Alert>
                    </Snackbar>) : null
        }
            <h1>Admin</h1>

            <div>
                <h2>Set a Date to be Closed</h2>
                <DesktopDatePicker
                    name = "date"
                    minDate={today}
                    size="small"
                    value={date}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                    />
                    <Button id="button-basic" variant="contained" color="primary" onClick={addDayClosed}>Submit Date to be Closed</Button>
            </div>

            <br></br>

            <div>
                <h2>Upload Images</h2>
                <form onSubmit={handleSubmit} className='form'>
                    <Button variant="contained" component="label"><input type='file' accept='image/*' hidden onChange={changeHandler}/>Select File</Button>
                    <Button variant="contained" type='submit'>Upload</Button>
                </form>
                <h2>Selected File: {filename}</h2>
                {
                !imgUrl &&
                    <Box
                        display="flex" 
                        width="auto" height="auto" 
                        alignItems="center"
                        justifyContent="center"
                    >
                        <ProgressBar bgcolor={"#a00000"} completed={progresspercent} />
                    </Box>
                    
                }
                {
                    imgUrl &&
                    <img src={imgUrl} alt='uploaded file' height={200} />
                }
            </div>

            <br></br>

            <div>
                <h2>Remove Images</h2>
                <p>(Browser will refresh!)</p>
                <Box
                    display="flex" 
                    alignItems="center"
                    justifyContent="center"
                >
                    <AdminStyles></AdminStyles>
                </Box>
                
            </div>

            <br></br>

            <div>
                <h2>Add Service</h2>
                <form className="form">
                    <Box 
                        display="flex" 
                        width="auto" height="auto" 
                        alignItems="center"
                        justifyContent="center"
                    >
                        <TextField id="outlined-basic" label="Service Name" variant="outlined" value={serviceInput} InputLabelProps={{shrink: true}} onChange={e => setServInput(e.target.value)}/>
                        <TextField id="outlined-basic" label="Service Price" variant="outlined" value={servPriceInput} InputLabelProps={{shrink: true}} onChange={e => setServPriceInput(e.target.value)}/>
                        <Button variant="contained" onClick={handleServSubmit}>Add Service</Button>
                    </Box>
                </form>
            </div>

            <br/><br/>

            <div>                
                <h2>List of Services and Prices</h2>
                <ul>
                    {inputs.map(item => <Service key = {item.id} arr = {item}/>)}
                </ul>
            </div>
        </div>
        </LocalizationProvider>
    );
}

export default Admin;