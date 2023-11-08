import React, { useEffect, useState } from "react";

const Analytics = () => {
  const [analyticData, setAnalyticData] = useState(null);

  useEffect(() => {
    const AnayticsFetched = fetch("/api/analytics/get-analytics-data")
      .then((res) => res.json())
      .then((data) => {
        setAnalyticData(data.data);
      });
  }, []);

  return (
    <div className="w-[100%] h-[100%] flex justify-center items-center">
      {analyticData && (
        <div>
          {Object.keys(analyticData).map((block) => {
            return (
              <div
                className="bg-orange-400/30 p-2 mt-1 rounded-lg cursor-pointer"
                key={analyticData[block]._id}
              >
                {analyticData[block].title}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Analytics;
