import { Navbar } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <>
      <Navbar>
        <div className=" bg-fuchsia-600 w-full h-16 mb-5  p-3">
          <Link to={"/"}>Dashboard</Link>
          <Link to={"/monthwisedata"} className="ml-[700px] ">
            Monthly Transctions
          </Link>
          <Link to={"/barchart"} className="ml-[300px] ">
            Bar Chart
          </Link>
        </div>
      </Navbar>
    </>
  );
};
