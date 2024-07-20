import React, { useState } from 'react';
import './ImageSelect.css'; // Create a CSS file for styling

const ImageSelect = ({ images, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(value);

  const handleSelect = (image) => {
    setSelectedImage(image);
    onChange(image);
    setIsOpen(false);
  };

  return (
    <div className="image-select">
      <div className="selected-image" onClick={() => setIsOpen(!isOpen)}>
        {selectedImage ? (
          <img src={selectedImage} alt="Selected" />
        ) : (
          <span>Select Image</span>
        )}
      </div>
      {isOpen && (
        <div className="image-options">
          {images.map((img, index) => (
            <div key={index} className="image-option" onClick={() => handleSelect(img.path)}>
              <img src={img.path} alt={img.name} /> <p className='pselect'>{img.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSelect;
