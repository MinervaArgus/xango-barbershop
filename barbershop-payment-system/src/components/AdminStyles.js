import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { ref, getDownloadURL, getStorage ,listAll, deleteObject } from "firebase/storage";

function AdminStyles() {
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
        <div id="Hair-Images">
          {imageUrls && imageUrls.map((url) => {
            return(
              <div key = {url} className='image'>
                <Button variant="outlined" onClick={() => {
                        deleteObject(ref(storage, url))
                        window.location.reload(false);
                    }}>
                  <img width={200} src={url} alt=""/>
                  Delete Image
                </Button> 
              </div>
            );
          })}
        </div>
      </div>
    )
}

export default AdminStyles;