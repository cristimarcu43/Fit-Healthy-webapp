import React from "react";

const MainHeader = (props) => {
  return (
    <header className="text-white w-full mx-auto h-24 bg-sky-950 flex items-center  justify-between mb-4 inset-x-0 top-0 z-10 fixed md:align-top">
      {props.children}
    </header>
  );
};

export default MainHeader;
