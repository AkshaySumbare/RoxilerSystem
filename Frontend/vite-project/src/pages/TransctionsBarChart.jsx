import React from "react";
import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export const TransctionsBarChart = () => {
  const [barData, setBarData] = useState([]);
  const [monthData, setMonthData] = useState("3");

  const MonthWiseData = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];


  let content;

  if (monthData == 1) {
    content = <p>{MonthWiseData[0]}</p>;
  } else if (monthData == 2) {
    content = <p>{MonthWiseData[1]}</p>;
  } else if (monthData == 3) {
    content = <p>{MonthWiseData[2]}</p>;
  } else if (monthData == 4) {
    content = <p>{MonthWiseData[3]}</p>;
  } else if (monthData == 5) {
    content = <p>{MonthWiseData[4]}</p>;
  } else if (monthData == 6) {
    content = <p>{MonthWiseData[5]}</p>;
  } else if (monthData == 7) {
    content = <p>{MonthWiseData[6]}</p>;
  } else if (monthData == 8) {
    content = <p>{MonthWiseData[7]}</p>;
  } else if (monthData == 9) {
    content = <p>{MonthWiseData[8]}</p>;
  } else if (monthData == 10) {
    content = <p>{MonthWiseData[9]}</p>;
  } else if (monthData == 11) {
    content = <p>{MonthWiseData[10]}</p>;
  } else if (monthData == 12) {
    content = <p>{MonthWiseData[11]}</p>;
  }

  const handleMonthData = async (event) => {
    let value = event.target.value;
    setMonthData(value);
    try {
      const res = await fetch(
        `http://localhost:3000/api/products/bar?month=${value}`
      );
      const data = await res.json();

      if (res.ok) {
        setBarData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleData = async (event) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/products/bar?month=3}`
      );
      const data = await res.json();

      if (res.ok) {
        setBarData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleData();
  }, []);

  useEffect(() => {
    handleMonthData();
  }, [monthData]);
  return (
    <>
      <div className="">
        
        <div className=" mt-11 flex space-x-[120px] justify-center">
          <div className="flex font-bold text-2xl">
          <div className="">Bar Chart Stats- </div>
          <div className="">{content}</div>

          </div>
       
          <div className="border-2 black w-40 ">
            <select
              name=""
              id=""
              style={{
                width: "120px",
                borderRadius: "2px",
                height: "35px",
              }}
              onChange={handleMonthData}
              value={monthData}
            >
              <option>Select Month </option>
              {MonthWiseData.map((month, index) => {
                return (
                  <>
                    <option value={index + 1} key={index}>
                      {month}
                    </option>
                  </>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="mt-40 ml-40">
        <ResponsiveContainer width="50%" aspect={3}>
          <BarChart
            data={barData.length > 0 && barData != undefined && barData}
            width={400}
            height={400}
          >
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="blue" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
