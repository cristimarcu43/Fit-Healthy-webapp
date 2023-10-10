import React from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 w-screen h-screen bg-slate-900 z-10" onClick={props.onClick}></div>,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;
