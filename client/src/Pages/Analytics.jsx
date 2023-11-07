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
      {console.log(analyticData)}
      {analyticData && (
        <div>
          {Object.keys(analyticData).map((analytic) => {
            <h1>{analytic.title}</h1>;
          })}
        </div>
      )}
    </div>
  );
};

export default Analytics;
