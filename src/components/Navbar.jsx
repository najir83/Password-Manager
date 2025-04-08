import React from "react";

const Navbar = () => {
  const goGithub = () => {
    window.open("https://github.com/najir83", "_blank");
  };
  return (
    <nav className=" bg-slate-800">
      <div className="mycontainer  flex justify-between items-center px-4  py-5 h-15  text-white">
        <div className="logo font-bold text-sm md:text-lg">
          <span className=" text-green-700">&lt; </span> Pass
          <span className=" text-green-700">OP /&gt;</span>{" "}
        </div>
        <ul>
          <li className="flex gap-4 text-sm md:text-lg">
            <a href="#" className="hover:font-bold">
              Home
            </a>
            <a href="#" className="hover:font-bold">
              About
            </a>
            <a href="#" className="hover:font-bold">
              Contact
            </a>
          </li>
        </ul>

        <button
          onClick={goGithub}
          className="text-white p-2 my-4 cursor-pointer flex justify-center items-center gap-3 font-bold text-sm md:text-lg"
        >
          <img
            className="w-5 md:w-9 bg-black rounded-full"
            src="src/assets/github-mark-white.png"
            alt="github logo"
          />
          Github
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
