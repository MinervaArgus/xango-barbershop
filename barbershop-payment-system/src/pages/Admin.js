import React, { useEffect, useState } from "react";
import '../styles/Admin.css';
import { storage, db } from "../firebase.js"
import Service from "../components/Services";
import ProgressBar from "../components/ProgressBar";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { TextField, Button, Autocomplete, Box } from "@mui/material";
import { doc, collection, onSnapshot, query, addDoc, orderBy, updateDoc } from "firebase/firestore"

const q = query(collection(db, 'hairstylePrices'), orderBy('typeOfService'));

function Admin() {
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [inputs, setInputs] = useState([]);
    const [serviceInput, setServInput] = useState('');
    const [servPriceInput, setServPriceInput] = useState(0);
    let [editServPriceInput, setEditServPriceInput] = useState(0);
    let [serviceName, setServiceName] = useState([{}]);
    let [inputID, setInputID] = useState("");
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
            });
        }
        );
    }

    useEffect(() => {
        onSnapshot(q, (snapshot) => {
            setInputs(snapshot.docs.map(doc => ({
                id: doc.id,
                item: doc.data()
            })))
            
           
        })
    }, [serviceInput], [servPriceInput], [serviceName]);

    const handleServSubmit = (e) => {
        e.preventDefault();
        addDoc(collection(db, 'hairstylePrices'), {
            typeOfService: serviceInput,
            servicePrice: servPriceInput
        })
        setServInput();
        setServPriceInput();
    };

    const handleServUpdate = (e) => {
        e.preventDefault();
        // Reference to specific field in doc
        for (let i = 0; i < inputs.length; i++){
            if (serviceName === inputs[i].item){
                setInputID(inputs[i].id);
            }
        }

        const docRef = doc(db, "hairstylePrices", inputID);
        updateDoc(docRef, {servicePrice: editServPriceInput})
    }

    const changeHandler = (e) => {
        if (e.target.files.length > 0) {
            filename = e.target.files[0].name;
            setFileName(filename);
        } else {
            filename = 'none';
            setFileName(filename);
        }
    }

    for (let i = 0; i < inputs.length; i++){
        console.log(serviceName[i]);
        serviceName[i] = inputs[i].item.typeOfService; 
    }
    

    return (
        <div>
            <h1>Admin</h1>
            <div>
                <h2>Image Uploader</h2>
                <form onSubmit={handleSubmit} className='form'>
                    <Button variant="contained" component="label"><input type='file' accept='image/*' hidden onChange={changeHandler}/>Select File</Button>
                    <Button variant="contained" type='submit'>Upload</Button>
                </form>
                <h2>Selected File: {filename}</h2>
                <br></br>
                {
                !imgUrl &&
                    <div className='centered-div' style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <ProgressBar  bgcolor={"#a00000"} completed={progresspercent} />;
                    </div>
                }
                {
                    imgUrl &&
                    <img src={imgUrl} alt='uploaded file' height={200} />
                }
            </div>

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
                        <Button variant="contained" onClick={handleServSubmit}>Edit Service</Button>
                    </Box>
                </form>
            </div>

            <br></br>

            <div>
                <h2>Edit Service</h2>
                <form className="form">
                    <Box 
                        display="flex" 
                        width="auto" height="auto" 
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Autocomplete
                            id="outlined-basic"
                            options={serviceName}
                            variant="outlined"
                            sx={{width: 227}}
                            onChange={e => setServiceName(e.target.value)}
                            renderInput={(params) => <TextField {...params} label="Services" variant="outlined" InputLabelProps={{shrink: true}}/>}
                        />

                    <TextField id="outlined-basic" label="Service Price" variant="outlined" value={editServPriceInput} InputLabelProps={{shrink: true}} onChange={e => setEditServPriceInput(e.target.value)}/>
                    <Button variant="contained" onClick={handleServUpdate}>Edit Service</Button>
                    </Box>
                    
                </form>
            </div>

            <br></br>

            <div>                
                <h2>List of Services and Prices</h2>
                <ul>
                    {inputs.map(item => <Service key = {item.id} arr = {item}/>)}
                </ul>
            </div>
        </div>
    );
}

export default Admin;