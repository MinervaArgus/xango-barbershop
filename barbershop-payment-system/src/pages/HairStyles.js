import React from "react";
import { storage } from "../firebase.js";
import { useState, useEffect } from "react";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import '../styles/HairStyles.css';

function HairStyles() {
  const [imageUrls, setImageUrls] = useState([]);
  const imagesListRef = ref(storage, "images/");

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
    // eslint-disable-next-line
  }, []);

  // delete(){
  //   var deleteRef = firebase.storage().child('images/example.jpg');
  //   deleteRef.delete().then()
  // }

  return(
    <div>
      <h1>Styles</h1>
      <br></br>
      <br></br>
      <div id="Hair-Images">
        {imageUrls && imageUrls.map((url) => {
          // return <img id="hair-imgs" src={url} alt=""/>;
          return(
            <div key = {url} className='image'>
              <img src={url} height="200" />
              <button
                onClick={() =>
                setImageUrls(imageUrls.filter((e) => e !== url))
              }
              >
                Delete Image
                </button> 
            </div>
          );
        })}
      </div>
      
    </div>
  )
}

export default HairStyles;