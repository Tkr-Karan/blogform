import Loader from "../Atom/Loader";

export default function VideoImageSurvey(props) {
  const { blockData, handleClick } = props;
  return (
    <div style={{ marginLeft: "3rem" }}>
      {blockData.imageData.data && blockData.videoData.data ? (
        <div className="w-[80%] h-[100%] flex flex-col align-center justify-center">
          <div className="dashboard-heading">
            <h1 className="text-[1.5rem] font-bold">Welcome To Dashboard!!</h1>
          </div>
          <div className="w-[100%] flex flex-wrap gap-2 self-center items-center justify-center">
            <div className=" flex gap-2" style={{ width: "100%" }}>
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
            <div className="flex gap-2 w-[100%]">
              <h2 className="text-2xl capitalize">videos</h2>
              <div className=" w-[90%] flex flex-wrap gap-1 justify-start items-center">
                {blockData.videoData.data.map((block, index) => {
                  return (
                    <div
                      key={index}
                      className="w-[8rem] h-[5rem] p-2 rounded-lg bg-violet-400 cursor-pointer flex justify-center items-center"
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
    </div>
  );
}
