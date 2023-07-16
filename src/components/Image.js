import React, { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';
import AvatarEditor from 'react-avatar-editor';
import '../App.css';


const ImageToText = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [scale, setScale] = useState(1);
  const [recognizedText, setRecognizedText] = useState(null);
  const editorRef = useRef();
  const fileInputRef = useRef();


  const handleImageChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleCrop = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const croppedImageUrl = canvas.toDataURL();
      setCroppedImage(croppedImageUrl);
      setScale(1);
      setRecognizedText(null);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setCroppedImage(null);
    setScale(1);
    setRecognizedText(null);
  };

  const handleScaleChange = (event) => {
    setScale(parseFloat(event.target.value));
  };

  const recognizeText = async () => {
    if (croppedImage) {
      Tesseract.recognize(croppedImage, 'eng')
        .then(({ data }) => {
          setRecognizedText(data.text);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  const handleRecognizeText = () => {
    recognizeText();
  };
  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className='App'>
      <h1>Image Cropper App</h1>
      {!selectedImage && (
        <>
          <div className='icon'
            style={{ cursor: 'pointer', textAlign: "center", }}
            onClick={handleIconClick}
          >
            {/* Use the custom icon here */}
            <img
              src="./icon.png"
              alt="Upload Icon"
              width="300"
              height="300"
            />

          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={fileInputRef}
          />
        </>
      )}
      {!croppedImage && selectedImage && (
        <>
          <div>
            <AvatarEditor
              ref={editorRef}
              image={selectedImage}
              width={250}
              height={250}
              border={50}
              color={[255, 255, 255, 0.6]}
              scale={scale}
              rotate={0}
            />
          </div>
          <div>
            <input
              type="range"
              min="1"
              max="2"
              step="0.1"
              value={scale}
              onChange={handleScaleChange}
            />
          </div>
          <div>
            <button onClick={handleCrop}>Crop</button>
          </div>
        </>
      )}
      {croppedImage && (
        <>
          <h2>Image</h2>
            {/* Use the custom icon here */}
            <img
              src={croppedImage}
              alt="Upload Icon"
              width="300"
              height="300"
            />
          <div>
            <button onClick={handleRecognizeText}>Recognize Text</button>

            <button onClick={handleReset}> Another Image</button>
          </div>
          {recognizedText && (
            <div>
              <h2>Recognized Text</h2>
              <p>{recognizedText}</p>
            </div>
          )}

        </>
      )}
    </div>
  );
};

export default ImageToText;