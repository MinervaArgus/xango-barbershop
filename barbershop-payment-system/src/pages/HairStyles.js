import React from "react";
import { useState, useEffect } from "react";
import { ref, getDownloadURL, getStorage, listAll } from "firebase/storage";
import { Carousel, Container } from "react-bootstrap";
import axios from "axios";

function HairStyles() {
  const [imageUrls, setImageUrls] = useState([])
  // const storage = getStorage();
  // const imagesListRef = ref(storage, "images/Hairstyles/");
  const [error, setError] = useState(false);
  useEffect(() => {
    /* listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    }); */
    axios.get('http://35.180.115.132:4000/api/getHairstyles')
      .then(res => {
        console.log("response: ", res);

        if (res.status === 200) {
          setImageUrls(res.data);
          setError(false);
        } else if (res.status === 500) {
          setError(true);
        }

      });
    // eslint-disable-next-line
  }, []);

  return (
    <Container className="my-3">
      <h1>Styles</h1>
      {/* <Carousel
        nextIcon={<span aria-hidden="true"/>}
        prevIcon={<span aria-hidden="true"/>}
        variant="dark" className="my-3">
          {imageUrls && imageUrls.map((url) => {
            return <Carousel.Item><img style={{height: "18rem"}} key={url} src={url} alt=""/></Carousel.Item>
          })}
      </Carousel> */}

      <Carousel indicators={false} variant="dark" className="my-3">
        {imageUrls && imageUrls.map((url, key) => {
          return <Carousel.Item key={key}><img style={{ height: "18rem" }} src={url} alt="" /></Carousel.Item>
        })}
      </Carousel>
    </Container>
  )
}

export default HairStyles;