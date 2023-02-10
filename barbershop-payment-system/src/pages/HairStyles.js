import React from "react";
import { useState, useEffect } from "react";
import { ref, getDownloadURL, getStorage ,listAll } from "firebase/storage";
import { Carousel, Container } from "react-bootstrap";

function HairStyles() {
  const [imageUrls, setImageUrls] = useState([])
  const storage = getStorage();
  const imagesListRef = ref(storage, "images/Hairstyles/");

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
    <Container className="my-3">
      <h1>Styles</h1>
      <Carousel
        nextIcon={<span aria-hidden="true"/>}
        prevIcon={<span aria-hidden="true"/>}
        variant="dark" className="my-3">
          {imageUrls && imageUrls.map((url) => {
            return <Carousel.Item><img style={{height: "18rem"}} key={url} src={url} alt=""/></Carousel.Item>
          })}
      </Carousel>

      <Carousel indicators={false} variant="dark" className="my-3">
          {imageUrls && imageUrls.map((url) => {
            return <Carousel.Item><img style={{height: "18rem"}} key={url} src={url} alt=""/></Carousel.Item>
          })}
      </Carousel>
    </Container>
  )
}

export default HairStyles;