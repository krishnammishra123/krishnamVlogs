import React from "react";

const Loading = () => {
  const loadingContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const loadingTextStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "white",
  };

  const loadingSpinnerStyle = {
    marginLeft: "10px",
    animation: "spin 1s linear infinite",
  };

  const keyframesStyle = `@keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }`;

  return (
    <div style={loadingContainerStyle}>
      <style>{keyframesStyle}</style>
      <div style={loadingTextStyle}>Loading</div>
      <div style={loadingSpinnerStyle}>...</div>
    </div>
  );
};

export default Loading;
