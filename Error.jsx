import React from "react";
import App from "./App";

const GoBack = () => {
  return <App />;
};

const Error = () => {
  return (
    <>
      <button onClick={GoBack}>GoBack</button>
    </>
  );
};

export default Error;
