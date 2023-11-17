import React, { useEffect, useState } from "react";
import "./Dashboard.css";

import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { PublishedBlocks } from "../ApiCalls/blocks";
import { ToastContainer, toast } from "react-toastify";
import VideoImageSurvey from "../components/VideoImageSurvey";

const Dashboard = () => {
  const [blockData, setBlockData] = useState({ imageData: {}, videoData: {} });
  const [isShow, setIsShow] = useState(false);
  const [currentData, setCurrentData] = useState({ data: {} });
  const [isLoading, setIsLoading] = useState(false);
  const [publishStatus, setPublishStatus] = useState({}); // Changed to an object

  const navigate = useNavigate();

  const fetchingBlockData = async () => {
    try {
      const [imageResponse, videoResponse, surveyResponse] = await Promise.all([
        fetch("/api/image/get-image-block-data"),
        fetch("/api/video/get-video-block-data"),
        fetch("/api/survey/get-survey-block-data"),
      ]);

      const imageData = await imageResponse.json();
      const videoData = await videoResponse.json();
      const surveyData = await surveyResponse.json();

      // console.log("imageData -->", imageData);
      // console.log("videoData -->", videoData);

      setBlockData({ imageData, videoData, surveyData });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // fetchingBlockData();
  useEffect(() => {
    fetchingBlockData();
  }, []);

  const handleClick = (val) => {
    // console.log(val);
    setIsShow(true);
    setCurrentData({ data: val });

    // console.log("currentData: ", currentData);
  };

  const handleClose = () => {
    setIsShow(false);
  };

  const handleAnalytics = () => {
    navigate("/analytics");
  };

  // creating the shareabe link
  const generateShareableLink = async (
    id,
    type,
    blockData,
    title,
    description,
    imageUrl,
    videoUrl,
    questions
  ) => {
    try {
      setIsLoading(true);
      const published = {
        title: title,
        description: description,
        blockType: type,
        urls: type === "image" ? imageUrl : videoUrl,
        questionsData: questions,
        isPublished: true,
      };

      console.log(published);
      const res = await PublishedBlocks(published);

      if (res.success) {
        console.log(`http://localhost:3001/published/${type}/${id}`);
        toast.success("block published successfully");
        setPublishStatus((prevStatus) => ({
          ...prevStatus,
          [id]: true, // Set the published status for the clicked block
        }));
      } else {
        toast.error("try after some time facinf some issue!!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard-container flex justify-between">
      <div className="dash-blogs-container h-[100%] w-[100%] self-center ">
        {/* block complete details */}

        <VideoImageSurvey blockData={blockData} handleClick={handleClick} />

        {isShow && (
          <div className="block-details w-[40%] h-[100%] bg-slate-100 flex justify-center items-center relative">
            <div
              className="close absolute top-2 left-4 text-[1.3rem] cursor-pointer"
              onClick={handleClose}
            >
              <i class="fa-solid fa-angle-right"></i>
            </div>

            {Object.keys(currentData).map((curr, indx) => {
              const id = currentData[curr]._id;
              return (
                <div
                  key={indx}
                  className="w-[100%] flex flex-col items-center gap-5"
                >
                  <h3>Title: {currentData[curr].title}</h3>
                  <p>Descripiton: {currentData[curr].description}</p>
                  {currentData[curr].blockType.type === "image" ? (
                    <div className="flex flex-wrap gap-2 justify-center items-center">
                      {currentData[curr].imageUrl.map((img, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={img}
                          alt=""
                          width={150}
                          height={150}
                        />
                      ))}
                    </div>
                  ) : currentData[curr].blockType.type === "video" ? (
                    <div className="flex flex-wrap gap-2 justify-center items-center">
                      <ReactPlayer
                        // key={sq}
                        url={currentData[curr].videoUrl}
                        alt=""
                        width={250}
                        height={150}
                        controls={true}
                      />
                    </div>
                  ) : (
                    <div>{}</div>
                  )}
                  {/* blocks actions buttons */}
                  <div className="actions-btn self-center flex gap-4">
                    <button
                      className={`w-[100%] publish rounded-md p-3 cursor-pointer font-bold ${
                        publishStatus[id] ? "bg-gray-500/20" : "bg-emerald-500"
                      }`}
                      onClick={() =>
                        generateShareableLink(
                          !publishStatus[id] && currentData[curr]._id,
                          currentData[curr].blockType.type,
                          currentData[curr],
                          currentData[curr].title,
                          currentData[curr].description,
                          currentData[curr].imageUrl,
                          currentData[curr].videoUrl,
                          currentData[curr].questionsData
                        )
                      }
                      disabled={publishStatus[id]}
                    >
                      {publishStatus[id] ? (
                        <div>Published</div>
                      ) : isLoading ? (
                        <div>Publishing...</div>
                      ) : (
                        <button>Publish</button>
                      )}
                      <ToastContainer />
                    </button>

                    <div
                      className="analytics w-[100%] rounded-md bg-orange-300 p-3 text-black cursor-pointer font-bold"
                      onClick={handleAnalytics}
                    >
                      <button>Analytics</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
