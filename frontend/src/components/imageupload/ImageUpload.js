import React, { useState } from 'react'
import { dropDownClassName } from '../pages/insert/NewAd.syled.css';
import ImageUploader from "react-images-upload";

function ImageUpload(props) {


  const [pictures, setPictures] = useState(null);

  const onDrop = picture => {
    setPictures({
      pictures: picture
    });
  };

  console.log(pictures);
  return (
    <div >
      <ImageUploader
        withIcon={true}
        buttonText="Choose images"
        onChange={onDrop}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      />
    </div>
  );
}
export default ImageUpload
