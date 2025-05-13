import React from 'react';

const ImageUpload = ({ onImageUpload }) => {
  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImageUpload(file); // Calling the passed prop function
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} />
    </div>
  );
};

export default ImageUpload;
