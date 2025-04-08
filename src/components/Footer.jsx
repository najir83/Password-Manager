import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-800 h-[13vh] p-4 text-white flex flex-col justify-center items-center w-full fixed bottom-0">
      <div className="logo font-bold ">
        <span className=" text-green-700">&lt; </span> Pass
        <span className=" text-green-700">OP /&gt;</span>{" "}
      </div>
      <h3>Created By Sk Najir</h3>
    </div>
  );
};

export default Footer;
