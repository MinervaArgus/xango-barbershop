import React from "react";
import Button from '@mui/material/Button';
import '../styles/Admin.css';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import { storage, db } from "../firebase.js"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import {collection, onSnapshot, query, orderBy, addDoc, serverTimestamp} from "firebase/firestore"

const q = query(collection(db, 'todos'), orderBy('timestamp', 'desc'));

function Admin() {
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const imagesRef = ref(storage, 'images');

    const [todos, setTodos]=useState([]);
    const [input, setInput]=useState('');
    const [input2, setInput2]=useState('');

    useEffect(() => {
        onSnapshot(q, (snapshot) => {
            setTodos(snapshot.docs.map(doc => ({
                id: doc.id,
                item: doc.data()
            })))
        })
    }, [input], [input2]);


    const handleSubmit = (e) => {
        e.preventDefault()
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
            // add doc in collection to ref image and hair type
            });
        }
        );
    }
    

    return (
        <div>
            <h1>Admin</h1>
            <h2>File uploader</h2>
            <form onSubmit={handleSubmit} className='form'>
                {/* <TextField id="outlined-basic" label="Type Of Cut" variant="outlined" size="small" value={input} InputLabelProps={{shrink: true}} onChange={e=>setInput(e.target.value)} /> */}
                <InputLabel id="hairStyleSelect">Type of Hair Style</InputLabel>
                <Select
                    labelId="hairStyleSelect"
                    id="hair-style-select"
                    value={input}
                    label="Hair Style"
                    onChange={e=>setInput(e.target.value)}
                    >
                    <MenuItem value={"Low Fade"}>Low-Fade</MenuItem>
                    <MenuItem value={"Mid Fade"}>Mid-Fade</MenuItem>
                    <MenuItem value={"Short"}>Short Hair</MenuItem>
                </Select>
                <Button variant="contained" component="label"><input type='file' hidden/>Select File</Button>
                <Button variant="contained" type='submit'>Upload</Button>
                <br></br>
            </form>

            {
            !imgUrl &&
                <div className='centered-div' style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
                </div>
            }
            {
                imgUrl &&
                <img src={imgUrl} alt='uploaded file' height={200} />
            }
        </div>
    );
}
// Firebase Storage access
// https://www.makeuseof.com/upload-files-to-firebase-using-reactjs/

export default Admin;