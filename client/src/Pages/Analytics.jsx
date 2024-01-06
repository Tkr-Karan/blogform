import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import Loader from "../Atom/Loader";
import "./Stylesheets/Analytics.css";

const Analytics = () => {
  const [analyticData, setAnalyticData] = useState(null);
  const [searchBlock, setSearchBlock] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const AnayticsFetched = fetch("/api/analytics/get-analytics-data")
      .then((res) => res.json())
      .then((data) => {
        setAnalyticData(data.data);
      });
  }, []);

  const goToTestBlock = (id) => {
    navigate(`/blocks/${id}`);
  };

  const handleSearch = (e) => {
    setSearchBlock(e.target.value);
  };

  const filteredBlocks = analyticData
    ? Object.keys(analyticData).filter((block) =>
        analyticData[block].title
          .toLowerCase()
          .includes(searchBlock.toLowerCase())
      )
    : [];

  return (
    <div className="w-[100%] h-[100%] flex gap-6 justify-center items-center add-img">
      {analyticData ? (
        <div
          className="flex flex-col items-center justify-start
         gap-8 h-[100%]"
        >
          <div className="search w-[50rem] h-[2.5rem] flex items-center bg-white  rounded-md overflow-hidden p-2  mt-10">
            <input
              className="w-[100%] h-[100%] p-2 border-none outline-none "
              type="text"
              placeholder="use me for searching blocks"
              value={searchBlock}
              onChange={(e) => handleSearch(e)}
            />
            <i className="fa-solid fa-magnifying-glass cursor-pointer"></i>
          </div>

          {searchBlock.length > 3 ? (
            <div className="flex flex-wrap gap-2 w-[90%]  h-[40%] justify-center items-center ">
              {filteredBlocks.map((block) => (
                <div
                  className="bg-orange-400/100 p-2 mt-1 rounded-lg cursor-pointer h-[3rem] flex justify-center items-center"
                  key={analyticData[block]._id}
                  onClick={() => goToTestBlock(analyticData[block]._id)}
                >
                  {analyticData[block].title}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 w-[90%] h-[80%] mb-4 overflow-y-scroll items-start justify-center">
              {Object.keys(analyticData).map((block) => {
                return (
                  <div
                    className="bg-orange-400/100 p-2 mt-1 rounded-lg cursor-pointer h-[3rem] flex justify-center items-center"
                    key={analyticData[block]._id}
                    onClick={() => goToTestBlock(analyticData[block]._id)}
                  >
                    {analyticData[block].title}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Analytics;
