import React from "react";
import Button from '@mui/material/Button';
import '../styles/Admin.css';
import { useState } from 'react';
import { storage } from "../firebase.js"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

function Admin() {
    const [imgUrl, setImgUrl] = useState(null);
    const [progresspercent, setProgresspercent] = useState(0);

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
            });
        }
        );
    }
    

    return (
        <div>
            <h1>Admin</h1>
            <h2>File uploader</h2>
            <form onSubmit={handleSubmit} className='form'>
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