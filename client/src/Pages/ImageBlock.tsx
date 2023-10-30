import React, { useEffect, useState } from "react";
import "./Stylesheets/ImageBlock.css";

const ImageBlock = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<any>([]);

  const handleCreation = () => {
    setIsCreating(!isCreating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const imageBlockData = {
      name: title,
      desc : description,
      imageData : files
    }

    console.log("imaageBlockData: ", imageBlockData)

    setTitle("")
    setDescription("")
    setFiles([])

  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files;
    if (selectedFile && files.length < 4) {
      setFiles([...files, selectedFile]);
    }

    // console.log("image files ==> ", files)
  };

  const removeImage = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  useEffect(() => {
    // console.log("image files ==> ", files);
  }, [files]);

  return (
    <div className="image-survey-container">
      {isCreating ? (
        <div className="image-survey-form-container relative">
          <form
            className="image-survey-form "
            action=""
            onSubmit={handleSubmit}
          >
            <div className="image-title labels">
              <label> Title: {title} </label>
              <input
                className="form-inputs"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="image-description labels">
              <label> Description: {description} </label>
              <input
                className="form-inputs"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="upload-image">
              <p className="text-start">Upload images (max 4)</p>

              <div className="images-container flex gap-2 flex-wrap ">
                {files.map((file, index) => (
                  <div key={index} className="image-preview">
                    <img
                      style={{ width: "100px", height: "150px", borderRadius:"10px", objectFit:"cover" }}
                      src={URL.createObjectURL(file)}
                      alt=""
                    />
                    <button
                      className="remove-image-button p-1 rounded-lg bg-red-400 mt-2"
                      onClick={() => removeImage(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}

                {files.length < 4 && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                )}
              </div>
            </div>

            <button className="save-btn self-end w-16 bottom-0 right-0 mb-2 mr-4 bg-blue-600 p-2 rounded-xl cursor-pointer text-white">
              Save
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <h1>Create your own Image Survey!</h1>
          <div
            className="image-survey font-bold flex items-center justify-center  gap-2 border-dashed border-2 border-black p-1 cursor-pointer"
            onClick={handleCreation}
          >
            <i className="fa-solid fa-plus" style={{ color: " #a6a6a6" }}></i>
            <p className="text-sm">Create Image Survey</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageBlock;
