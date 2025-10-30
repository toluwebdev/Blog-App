import React from "react";
import { assets } from "../assets/assets";

import { useAppContext } from "../context/AppContext";
const Navbar = () => {
  const { navigate, token } = useAppContext();
  return (
    <div className="flex justify-between items-center cursor-pointer py-5 mx-8 sm:mx-20 xl:mx-32 ">
      <img
        src={assets.logo}
        onClick={() => navigate("/")}
        alt=""
        className="w-32 sm:w-24"       />
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center cursor-pointer gap-2 rounded-full text-sm  bg-primary text-white px-10 max-sm:px-4 py-2.5"
      >
        {token ? "Dashboard" : "Login"}{" "}
        <img src={assets.arrow} className="w-3" alt="arrow" />
      </button>
    </div>
  );
};

export default Navbar;
