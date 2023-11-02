import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import ReactPlayer from "react-player";
import Loader from "../Atom/Loader";

const Dashboard = () => {
  // const [imageData, setImageData] = useState({});
  // const [videoData, setVideoData] = useState({});

  const [blockData, setBlockData] = useState({ imageData: {}, videoData: {} });

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
    // const [imageResponse, videoResponse] = await Promise.all([
    //   fetch("/api/image/get-image-block-data"),
    //   fetch("/api/video/get-video-block-data"),
    // ])

    // const imageData = await imageResponse.json();
    // const videoData = await videoResponse.json();

    // console.log("imageData -->", imageData.data)
    // // .then((res) => Promise.all(res.map((r) => r.json())))
    // // .then((data) => {
    // //   data.forEach((val) => {
    // //     console.log({ ...val.data });
    // //     setBlockData();
    // //   });
    // // });

    // setBlockData({ ...imageData.data, videoData });

    // // const videoData = await fetch("/api/video/get-video-block-data")
    // //   .then((res) => res.json())
    // //   .then((data) => setVideoData(data.data));
    // // console.log("blockData");

    // console.log("blockData --> ", blockData);
  };

  // fetchingBlockData();

  useEffect(() => {
    fetchingBlockData();
    // setTimeout(() => {
    //   console.log(blockData);
    // }, 5000);
  }, []);

  const handleClick = (val) => {
    console.log(val)
  }

  return (
    <div className="dashboard-container">
      <h1 className="text-[1.5rem] font-bold">Welcome To Dashboard!!</h1>

      <div className="dash-blogs-container h-[100%] w-[60%] self-center">
        {blockData.imageData.data && blockData.videoData.data ? (
          <div className="flex flex-wrap gap-3 justify-center align-center self-center ">
            {blockData.imageData.data.map((block, index) => {
              return (
                <div
                  key={index}
                  className="w-[8rem] p-2 rounded-lg bg-slate-400 cursor-pointer"
                  onClick={() => handleClick(block.title)}
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
                  onClick={() => handleClick(block.title)}
                >
                  {block.title}
                </div>
              );
            })}
            {/* {Object.keys(videoData).map((video, index) => {
              return (
                <div
                  key={index}
                  className="w-[8rem] p-2 rounded-lg bg-slate-400 cursor-pointer"
                >
                  {videoData[video].title}
                </div>
              );
            })} */}
          </div>
        ) : (
          // <div className="no-blogs">
          //   <h1 className="text-[2rem] text-gray-400">No Blocks Yet!!</h1>
          // </div>
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
