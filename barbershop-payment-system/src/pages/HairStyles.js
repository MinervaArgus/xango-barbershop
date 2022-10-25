import React from "react";

import { storage } from "../components/config/config";

 // Get all the images from Storage
    const [files, setFiles] = useState();

useEffect(() => {
    const fetchImages = async () => {
      let result = await storage.ref().child("images").listAll();
      let urlPromises = result.items.map((imageRef) =>
        imageRef.getDownloadURL()
      );

      return Promise.all(urlPromises);
    };

    const loadImages = async () => {
      const urls = await fetchImages();
      setFiles(urls);
    };
    loadImages();
}, []);

  console.log(files);

const HairStyles = () => 
    <div onLoad={useEffect()}>
        <h1>Different types of hair styles</h1>
    </div>

export default HairStyles;