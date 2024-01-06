import React, { useEffect, useState } from "react";
import "./Stylesheets/ImageBlock.css";
import { ImagesBlocks } from "../ApiCalls/blocks";
import { ToastContainer, toast } from "react-toastify";
// import Form from "../Molecules/Form";

const ImageBlock = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [imageURL, setImageURL] = useState<string[]>([]);

  const handleCreation = () => {
    setIsCreating(!isCreating);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const base64Images = await convertImagesToBase64(imageURL);

      // console.log(base64Images);
      const imageBlockData = {
        title: title,
        description: description,
        imageUrl: base64Images,
      };

      const res = await ImagesBlocks(imageBlockData);
      if (res.success) {
        toast.success("Image survey dded successfully");
        setIsSaved(true);
      } else {
        toast.error("Image survey failed!");
      }

      // console.log("imaageBlockData: ", imageBlockData);

      setTitle("");
      setDescription("");
      setFiles([]);
    } catch (error) {
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setIsCreating(false);
      }, 4000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const newFiles = Array.from(selectedFiles);

      const imageURLs = [...imageURL, ...newFiles.map((file) => file.name)];
      setImageURL(imageURLs);
      console.log(imageURLs);

      // Check if the total number of files doesn't exceed 4
      if (files.length + newFiles.length <= 4) {
        const updatedFiles = [...files, ...newFiles];
        setFiles(updatedFiles);
      }
      // } else {
      //   alert("You can only upload up to 4 images.");
      // }
    }

    // console.log("image files ==> ", files)
  };

  const removeImage = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const convertImagesToBase64 = (imageName) => {
    return Promise.all(
      imageName.map(async (imageName) => {
        return new Promise((resolve, reject) => {
          // Find the corresponding file by name
          const file = files.find((f) => f.name === imageName);
          if (file) {
            const reader = new FileReader();
            reader.onload = () => {
              resolve(reader.result);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          } else {
            reject("File not found");
          }
        });
      })
    );
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
                      style={{
                        width: "100px",
                        height: "150px",
                        borderRadius: "10px",
                        objectFit: "cover",
                      }}
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
                    style={{ border: "none" }}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                )}
              </div>
            </div>

            <button
              className="save-btn self-end w-[8rem] bottom-0 right-0 mb-2 mr-4 bg-blue-600 p-2 rounded-xl cursor-pointer text-white"
              type="submit"
            >
              {isSaved ? (
                <div>Saved</div>
              ) : isLoading ? (
                <div>saving...</div>
              ) : (
                <button>Save</button>
              )}
            </button>
            <ToastContainer />
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
