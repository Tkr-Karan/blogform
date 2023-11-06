import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Loader from "../Atom/Loader";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { PublishedBlocks } from "../ApiCalls/blocks";
import { ToastContainer, toast } from "react-toastify";

const Dashboard = () => {
  const [blockData, setBlockData] = useState({ imageData: {}, videoData: {} });
  const [isShow, setIsShow] = useState(false);
  const [currentData, setCurrentData] = useState({ data: {} });

  const navigate = useNavigate();

  const fetchingBlockData = async () => {
    try {
      const [imageResponse, videoResponse] = await Promise.all([
        fetch("/api/image/get-image-block-data"),
        fetch("/api/video/get-video-block-data"),
      ]);

      const imageData = await imageResponse.json();
      const videoData = await videoResponse.json();

      // console.log("imageData -->", imageData);
      // console.log("videoData -->", videoData);

      setBlockData({ imageData, videoData });
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
    videoUrl
  ) => {
    try {
      const published = {
        title: title,
        description: description,
        blockType: type,
        urls: type === "image" ? imageUrl : videoUrl,
      };

      const res = await PublishedBlocks(published);

      if (res.success) {
        console.log(`http://localhost:3001/published/${type}/${id}`);
        toast.success("block published successfully");
      } else {
        toast.error("try after some time facinf some issue!!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-container flex justify-between">
      <div className="dash-blogs-container h-[100%] w-[100%] self-center ">
        {blockData.imageData.data && blockData.videoData.data ? (
          <div className="w-[80%] h-[100%] flex flex-col align-center justify-center">
            <div className="dashboard-heading">
              <h1 className="text-[1.5rem] font-bold">
                Welcome To Dashboard!!
              </h1>
            </div>
            <div className="w-[100%] flex flex-wrap gap-2 self-center items-center justify-center">
              <div className="flex gap-2">
                <h2 className="text-2xl capitalize">images</h2>
                <div className=" w-[90%] flex flex-wrap gap-1 justify-start items-center">
                  {blockData.imageData.data.map((block, index) => {
                    return (
                      <div
                        key={index}
                        className="w-[8rem] h-[5rem]  p-2 rounded-lg bg-slate-400 cursor-pointer flex justify-center items-center"
                        onClick={() => handleClick(block, "image")}
                      >
                        {block.title}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-2">
                <h2 className="text-2xl capitalize">videos</h2>
                <div className=" w-[90%] flex flex-wrap gap-1 justify-start items-center">
                  {blockData.videoData.data.map((block, index) => {
                    return (
                      <div
                        key={index}
                        className="w-[8rem] h-[5rem] p-2 rounded-lg bg-slate-400 cursor-pointer flex justify-center items-center"
                        onClick={() => handleClick(block)}
                      >
                        {block.title}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // <div className="no-blogs">
          //   <h1 className="text-[2rem] text-gray-400">No Blocks Yet!!</h1>
          // </div>
          <Loader />
        )}

        {/* block complete details */}
        {isShow && (
          <div className="block-details w-[40%] h-[100%] bg-slate-100 flex justify-center items-center relative">
            <div
              className="close absolute top-2 left-4 text-[1.3rem] cursor-pointer"
              onClick={handleClose}
            >
              <i class="fa-solid fa-angle-right"></i>
            </div>

            {Object.keys(currentData).map((curr, indx) => {
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
                  ) : (
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
                  )}
                  {/* blocks actions buttons */}
                  <div className="actions-btn self-center flex gap-4">
                    <div
                      className="w-[100%] publish rounded-md bg-emerald-500 p-3 cursor-pointer font-bold"
                      onClick={() =>
                        generateShareableLink(
                          currentData[curr]._id,
                          currentData[curr].blockType.type,
                          currentData[curr],
                          currentData[curr].title,
                          currentData[curr].description,
                          currentData[curr].imageUrl,
                          currentData[curr].videoUrl
                        )
                      }
                    >
                      <button>Publish</button>
                      <ToastContainer />
                    </div>

                    <div
                      className="analytics w-[100%] rounded-md bg-slate-500 p-3 text-white cursor-pointer font-bold"
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
