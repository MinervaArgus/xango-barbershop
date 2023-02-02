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