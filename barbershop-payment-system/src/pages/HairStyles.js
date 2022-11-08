import React from "react";
import { useState, useEffect } from "react";
import { ref, getDownloadURL, getStorage ,listAll } from "firebase/storage";
import '../styles/HairStyles.css';

function HairStyles() {
  const [imageUrls, setImageUrls] = useState([])
  const storage = getStorage();
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

  return(
    <div>
      <h1>Styles</h1>
      <br></br>
      <br></br>
      <div id="Hair-Images">
        {imageUrls && imageUrls.map((url) => {
          return <img key={url} id="hair-imgs" src={url} alt=""/>;
        })}
      </div>
    </div>
  )
}

export default HairStyles;