import React from "react";
import { useState, useEffect } from "react";
import { ref, getDownloadURL, getStorage ,listAll } from "firebase/storage";
import '../styles/Products.css';

function Products() {
  const [imageUrls, setImageUrls] = useState([])
  const storage = getStorage();
  const imagesListRef = ref(storage, "images/Products/");

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
      <h1>Products</h1>
      <br></br>
      <br></br>
      <div id="Product-Images">
        {imageUrls && imageUrls.map((url) => {
          return <img key={url} id="product-imgs" src={url} alt=""/>;
        })}
      </div>
    </div>
  )
}

export default Products;