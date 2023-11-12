import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";

const Analytics = () => {
  const [analyticData, setAnalyticData] = useState(null);
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

  return (
    <div className="w-[100%] h-[100%] flex justify-center items-center">
      {analyticData && (
        <div className="flex flex-wrap gap-2 w-[90%]">
          {Object.keys(analyticData).map((block) => {
            return (
              <div
                className="bg-orange-400/30 p-2 mt-1 rounded-lg cursor-pointer"
                key={analyticData[block]._id}
                onClick={() => goToTestBlock(analyticData[block]._id)}
              >
                {analyticData[block].title}

                {/* <ReactPlayer
                  url={analyticData[block].urls}
                  controls={true}
                  width={200}
                  height={200}
                  ref={videoRefs}
                  onStart={handleOnReady(
                    analyticData[block]._id,
                    analyticData[block].startTime
                  )}
                /> */}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Analytics;
