import Loader from "../Atom/Loader";

export default function VideoImageSurvey(props) {
  const { blockData, handleClick } = props;
  return (
    <div
      style={{
        marginLeft: "3rem",
        width: "80%",
        alignSelf: "baseline",
        height: "100%",
      }}
    >
      {blockData.imageData.data &&
      blockData.videoData.data &&
      blockData.surveyData.data ? (
        <div className="w-[100%] h-[100%] flex flex-col gap-4 align-center justify-start">
          {blockData.length < 1 ? (
            <div className="dashboard-heading">
              <h1 className="text-[1.5rem] font-bold">
                Welcome To Dashboard!!
              </h1>
            </div>
          ) : (
            <div className="w-[100%] grid grid-cols-3 flex-wrap gap-4 self-center items-start justify-center mt-4">
              <div
                className=" flex flex-col items-center gap-2"
                style={{ width: "100%" }}
              >
                <h2 className="text-2xl capitalize">images</h2>
                <div className=" w-[90%] flex flex-wrap gap-1 justify-start items-center  h-[80%]  overflow-y-scroll">
                  {blockData.imageData.data.map((block, index) => {
                    return (
                      <div
                        key={index}
                        className="w-[85%] h-[5rem]  p-2 rounded-lg bg-slate-400 cursor-pointer flex justify-center items-center"
                        onClick={() => handleClick(block, "image")}
                      >
                        {block.title}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-2 w-[100%] h-[100%] ">
                <h2 className="text-2xl capitalize">videos</h2>
                <div className=" w-[90%] flex flex-wrap gap-1 justify-center items-center h-[80%]  overflow-y-scroll ">
                  {blockData.videoData.data.map((block, index) => {
                    return (
                      <div
                        key={index}
                        className="w-[85%] h-[5rem] p-2 rounded-lg bg-violet-400 cursor-pointer flex justify-center items-center"
                        onClick={() => handleClick(block)}
                      >
                        {block.title}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-2 w-[100%]">
                <h2 className="text-2xl capitalize">Survey</h2>
                <div className=" w-[90%] flex flex-col gap-1 justify-start items-center  h-[80%]  overflow-y-scroll">
                  {blockData.surveyData.data.map((block, index) => {
                    return (
                      <div
                        key={index}
                        className="w-[85%] h-[5rem] p-2 rounded-lg bg-red-200 cursor-pointer flex justify-center items-center"
                        onClick={() => handleClick(block, "survey")}
                      >
                        {block.title}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="w-[100%] h-[100%] flex justify-center items-center">
          <Loader />

        </div>
      )}
    </div>
  );
}
