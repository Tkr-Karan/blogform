import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import ReactPlayer from "react-player";
import Loader from "../Atom/Loader";

const Dashboard = () => {
  // const [imageData, setImageData] = useState({});
  // const [videoData, setVideoData] = useState({});

  const [blockData, setBlockData] = useState({ imageData: {}, videoData: {} });
  const [isShow, setIsShow] = useState(false);
  const [currentData, setCurrentData] = useState({});

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
    console.log(val);
    setIsShow(true);
    setCurrentData(val);


    console.log(currentData)
  };

  return (
    <div className="dashboard-container flex justify-between">
      <h1 className="text-[1.5rem] font-bold">Welcome To Dashboard!!</h1>

      <div className="dash-blogs-container h-[100%] w-[100%] self-center ">
        {blockData.imageData.data && blockData.videoData.data ? (
          <div className="flex flex-wrap gap-3 justify-center align-center self-center ">
            {blockData.imageData.data.map((block, index) => {
              return (
                <div
                  key={index}
                  className="w-[8rem] p-2 rounded-lg bg-slate-400 cursor-pointer"
                  onClick={() => handleClick(block)}
                >
                  {block.title}
                </div>
              );
            })}
            {blockData.videoData.data.map((block, index) => {
              return (
                <div
                  key={index}
                  className="w-[8rem] p-2 rounded-lg bg-slate-400 cursor-pointer"
                  onClick={() => handleClick(block)}
                >
                  {block.title}
                </div>
              );
            })}
          </div>
        ) : (
          // <div className="no-blogs">
          //   <h1 className="text-[2rem] text-gray-400">No Blocks Yet!!</h1>
          // </div>
          <Loader />
        )}

        {/* block complete details */}
        {isShow && Object.keys(currentData).length && (
          <div className="block-details w-[80%] h-[100%] bg-slate-100">
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
