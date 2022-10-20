import React from "react";
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
                <input type='file' />
                <button type='submit'>Upload</button>
            </form>

            {
            !imgUrl &&
                <div className='outerbar'>
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


// User Authorization
// https://v5.reactrouter.com/web/example/auth-workflow
// https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications

// Firebase Storage access
// https://www.makeuseof.com/upload-files-to-firebase-using-reactjs/

export default Admin;