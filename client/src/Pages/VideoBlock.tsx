import React, { useEffect, useState } from "react";
import "./Stylesheets/VideoBlock.css";
import ReactPlayer from "react-player";
import { VideoBlocks } from "../ApiCalls/blocks";

const VideoBlock = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFiles, setVideoFiles] = useState<File[]>([]);

  const handleCreation = () => {
    setIsCreating(!isCreating);
  };

  const handleVideoSurvey = async (e) => {
    e.preventDefault();

    try {
      const videoBlockData = {
        title: title,
        description: description,
        videoUrl: videoFiles.map((video) => video.name)[0],
      };

      console.log("imaageBlockData: ", videoBlockData);

      const res = await VideoBlocks(videoBlockData);
      if (res.success) {
        console.log("success");
      } else {
        console.log("failed");
      }

      setTitle("");
      setDescription("");
      setVideoFiles([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddVideo = (e) => {
    const selectedVideo = e.target.files[0];

    if (selectedVideo) {
      setVideoFiles([...videoFiles, selectedVideo]);
    }
  };

  const removeVideo = (index) => {
    const updatedFiles = [...videoFiles];
    updatedFiles.splice(index, 1);
    setVideoFiles(updatedFiles);
  };

  useEffect(() => {
    console.log("videoFiles", videoFiles);
  }, [videoFiles]);

  return (
    <div className="video-block-container">
      {isCreating ? (
        <div className="video-survey-form-container">
          <h2>Video Survey Form</h2>

          <form className="video-survey-form" onSubmit={handleVideoSurvey}>
            <div className="video-title labels">
              <label>Video Title: {title} </label>
              <input
                className="form-inputs"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="video-description labels">
              <label> Description: {description} </label>
              <input
                className="form-inputs"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="upload-video">
              <p>Upload Video</p>

              <div className="upload-video-container">
                {videoFiles.map((video, index) => (
                  <div key={index} className="">
                    <ReactPlayer
                      url={URL.createObjectURL(video)}
                      controls={true}
                      width="400px"
                      height="200px"
                    />

                    <button
                      className="remove-image-button p-1 rounded-lg bg-red-400 mt-2"
                      onClick={() => removeVideo(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}

                {videoFiles.length < 1 && (
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleAddVideo}
                  />
                )}
              </div>
            </div>
            <button className="p-2 rounded-lg bg-green-600 text-white mt-2 w-[20%] text-center self-end cursor-pointer">
              save
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <h1>Create your own Survey!</h1>
          <div
            className="video-survey font-bold flex items-center justify-center  gap-2 border-dashed border-2 p-1 cursor-pointer"
            onClick={handleCreation}
          >
            <i className="fa-solid fa-plus" style={{ color: " #a6a6a6" }}></i>
            <p className="text-sm">Create Video Survey</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoBlock;
