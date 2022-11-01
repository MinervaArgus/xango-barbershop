import React, { useEffect, useState } from "react";
import '../styles/Admin.css';
import { storage, db } from "../firebase.js"
import Service from "../components/Services";
import ProgressBar from "../components/ProgressBar";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { TextField, Button, Select, MenuItem } from "@mui/material";
import { doc, collection, onSnapshot, query, addDoc, orderBy, updateDoc } from "firebase/firestore"

const q = query(collection(db, 'hairstylePrices'), orderBy('typeOfService'));

function Admin() {
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [inputs, setInputs] = useState([]);
    const [serviceInput, setServInput] = useState('');
    const [servPriceInput, setServPriceInput] = useState(0);
    const [dropInput, setDropInput] = useState([inputs]);
    //const [editServInput, setEditServInput] = useState('');
    const [editServPriceInput, setEditServPriceInput] = useState(0);

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
    }, [serviceInput], [servPriceInput]);

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
        const docRef = doc(db, "hairstylePrices");
        updateDoc(docRef, {servicePrice: editServPriceInput})
    }

    return (
        <div>
            <h1>Admin</h1>
            <div>
                <h2>Image Uploader</h2>
                <form onSubmit={handleSubmit} className='form'>
                    <Button variant="contained" component="label"><input type='file' accept='image/*' hidden/>Select File</Button>
                    <Button variant="contained" type='submit'>Upload</Button>
                </form>
                <br></br>
                {
                !imgUrl &&
                    <div className='centered-div' style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <ProgressBar  bgcolor={"#a00000"} completed={progresspercent} />;
                        {/* <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div> */}
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
                    <TextField id="outlined-basic" label="Service Name" variant="outlined" value={serviceInput} InputLabelProps={{shrink: true}} onChange={e => setServInput(e.target.value)}/>
                    <TextField id="outlined-basic" label="Service Price" variant="outlined" value={servPriceInput} InputLabelProps={{shrink: true}} onChange={e => setServPriceInput(e.target.value)}/>
                    <Button variant="contained" onClick={handleServSubmit}>Edit Service</Button>
                </form>
            </div>

            <br></br>

            <div>
                <h2>Edit Service</h2>
                <form>
                    <Select id="outlined-basic" label="Service Name" variant="outlined" value={dropInput} InputLabelProps={{shrink: false}} onChange={e => setDropInput(e.target.value)}>
                        {/* <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem> */}
                    </Select>
                    <TextField id="outlined-basic" label="Service Price" variant="outlined" value={editServPriceInput} InputLabelProps={{shrink: true}} onChange={e => setEditServPriceInput(e.target.value)}/>
                    <Button variant="contained" type="submit" onClick={handleServUpdate}>Edit Service</Button>
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