import React, { useState } from "react";
import './Stylesheets/ImageBlock.css';

const ImageBlock = () => {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreation = () => {
    setIsCreating(!isCreating);
  };

  return (
    <div className="image-survey-container">
      {isCreating ? (
        <div>
          <h2>Form Creation</h2>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <h1>Create your own Image Survey!</h1>
          <div
            className="image-survey font-bold flex items-center justify-center  gap-2 border-dashed border-2 p-1 cursor-pointer"
            onClick={handleCreation}
          >
            <i class="fa-solid fa-plus" style={{ color: " #a6a6a6" }}></i>
            <p className="text-sm">Create Image Survey</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageBlock;
