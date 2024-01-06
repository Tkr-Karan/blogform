import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";

export default function AnalyticsBlockTest() {
  const [analyticData, setAnalyticData] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);

  const videoRefs = useRef(null);

  const { id } = useParams();

  const handleOnReady = (id, startTime) => {
    if (videoRefs.current) {
      //   // Seek to the specified start time when the video is ready
      videoRefs.current.seekTo(parseFloat(startTime));
    }
  };

  const handleEnded = (progress) => {
    if (progress.playedSeconds >= analyticData.endTime) {
      if (videoRefs.current) {
        videoRefs.current.getInternalPlayer().pause();
      }
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
        <div className="flex flex-wrap gap-2 w-[90%] justify-center items-start h-[100%]">
          <div
            className="w-[100%] p-2 mt-1 rounded-lg cursor-pointer capitalize font-bold text-[1.5rem] flex flex-col justify-center items-center"
            key={analyticData._id}
          >
            <p className="self-start">{analyticData.title}</p>

            {analyticData.blockType === "image" && (
              <div className="h-[90vh] flex gap-2 self-center justify-center items-center">
                {analyticData.urls.map((imgPath, idx) => {
                  return (
                    <div className="w-[200px] h-[200px]">
                      <img
                        key={idx}
                        src={imgPath}
                        alt=""
                        width={200}
                        className="object-cover h-[100%]"
                      />
                    </div>
                  );
                })}
              </div>
            )}
            {analyticData.blockType === "video" && (
              <div className="w-[100%] h-[90vh] flex flex-col justify-center items-center self-center gap-2">
                <ReactPlayer
                  url={analyticData.urls}
                  controls={true}
                  width={400}
                  height={200}
                  ref={videoRefs}
                  onStart={handleOnReady(
                    analyticData._id,
                    analyticData.startTime
                  )}
                  onProgress={handleEnded}
                />

                <p className="font-thin text-[1rem] bg-red-100 p-1">
                  {" "}
                  user like the video from{" "}
                  <span className="font-bold">
                    {analyticData.startTime}s
                  </span>{" "}
                  to <span className="font-bold">{analyticData.endTime}s</span>
                </p>
              </div>
            )}
            {analyticData.blockType == "survey" && (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                  marginTop: "2rem",
                }}
              >
                {Object.keys(analyticData.surveyResponses).map(
                  (question, idx) => {
                    const currentQuestionNumber = idx + 1;
                    return (
                      <div
                        key={idx}
                        className="flex flex-col justify-between items-start w-[80vw]"
                      >
                        <div className="flex gap-6">
                          <p>{currentQuestionNumber}.</p>
                          <p style={{ color: "grey" }}>{question} </p>
                        </div>
                        <div className="flex gap-6 w-[100%]">
                          <p>ans.</p>
                          <div className="w-[40%] text-left">
                            {!Array.isArray(
                              analyticData.surveyResponses[question]
                            ) ? (
                              analyticData.surveyResponses[question]
                            ) : (
                              <div>
                                {analyticData.surveyResponses[question].join(
                                  "/"
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
