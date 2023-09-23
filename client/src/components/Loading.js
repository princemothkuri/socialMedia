import React, { useEffect } from "react";

const Loading = () => {
  return (
    <>
      {/* <div style={{ padding: 0, marginTop: "60px" }}>
        <div style={{ height: "80vh" }}>
          <div className="text-center">
            <img src={loading} alt="404 Error" style={{ width: "30%" }} />
            <h1> Loading...</h1>
          </div>
        </div>
      </div> */}
      <div className="loading-body">
        <div className="loading-container">
          <div className="ring"></div>
          <div className="ring"></div>
          <div className="ring"></div>
          <span className="loading-text">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Loading;
