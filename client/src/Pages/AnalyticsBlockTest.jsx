import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";

export default function AnalyticsBlockTest() {
  const [analyticData, setAnalyticData] = useState(null);

  const videoRefs = useRef(null);

  const { id } = useParams();

  const handleOnReady = (id, startTime) => {
    if (videoRefs.current) {
      //   // Seek to the specified start time when the video is ready
      videoRefs.current.seekTo(parseFloat(startTime));
    }
  };
  const AnayticsFetched = async (blockId) => {
    try {
      const response = await fetch(
        `/api/analytics/get-analytics-data/${blockId}`
      );
      const data = await response.json();
      setAnalyticData(data.data); // Set the analyticData state
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // console.log(blockId)
    AnayticsFetched(id);
  }, [id]);

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      {analyticData && (
        <div className="flex flex-wrap gap-2 w-[90%] justify-center items-center">
          <div
            className="bg-orange-400/30 p-2 mt-1 rounded-lg cursor-pointer"
            key={analyticData._id}
          >
            {analyticData.title}

            {analyticData.blockType === "image" && (
              <div>
                {analyticData.urls.map((imgPath, idx) => {
                  return <img key={idx} src={imgPath} alt="" />;
                })}
              </div>
            )}
            {analyticData.blockType === "video" && (
              <div className="w-[100%] h-[100%]">
                <ReactPlayer
                  url={analyticData.urls}
                  controls={true}
                  width={200}
                  height={200}
                  ref={videoRefs}
                  onStart={handleOnReady(
                    analyticData._id,
                    analyticData.startTime
                  )}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
