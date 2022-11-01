import React from "react";
import Button from '@mui/material/Button';
import '../styles/Admin.css';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { storage } from "../firebase.js"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

function Admin() {
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        const file = e.target[0]?.files[0]
        if (!file) return;
        let storageRef = ref(storage, `images/${file.name}`);
        if (input === 1){
            storageRef = ref(storage, `images/low-fade/${file.name}`);
        }
        if (input === 2){
            storageRef = ref(storage, `images/other-cuts/${file.name}`);
        }
        
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
    

    return (
        <div>
            <h1>Admin</h1>
            <h2>Image uploader</h2>
            <form onSubmit={handleSubmit} className='form'>
                <InputLabel id="hairStyleSelect">Type of Hair Style</InputLabel>
                <Select
                    labelId="hairStyleSelect"
                    id="hair-style-select"
                    value={input}
                    label="Hair Style"
                    onChange={() => setInput(input)}
                    >
                    <MenuItem value={"1"}>Low-Fade</MenuItem>
                    <MenuItem value={"2"}>Short Hair</MenuItem>
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

export default Admin;