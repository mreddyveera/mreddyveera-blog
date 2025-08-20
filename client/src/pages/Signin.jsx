import React from "react";
import { Link } from "react-router-dom";   // ✅ named import

function Signin() {
  return (
    <div className="min-h-screen mt-20">
      <div className="">
        {/*left*/}
        <Link
          to="/"
          className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-3 py-2 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
            Manikanta
          </span>{" "}
          Blog
        </Link>
      </div>
      <div className="">
        {/*right*/}
      </div>
    </div>
  );
}

export default Signin;
