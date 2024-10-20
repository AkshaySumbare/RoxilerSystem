import React from "react";
import { useState } from "react";
import { Table } from "flowbite-react";
export const MonthWiseData = () => {
  const [data, setData] = useState({
    total: 798,
    totalSoldItems: 1,
    totalUnsoldItems: 2,
  });
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

  const handleMonthData = async (e) => {
    let value = e.target.value;

    setMonthData(value);
    try {
      const res = await fetch(
        `http://localhost:3000/api/products/statistics?month=${value}`
      );
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="border-2 black h-[600px]">
      <div className="font-bold mb-10 flex justify-center text-2xl">
        Month Wise Data
      </div>
      <div className="flex justify-center space-x-5">
        <div className="mb-2 font-bold text-2xl">Stastics</div>
        <div className="mb-2 font-bold text-2xl">
          {content ? content : "March"}
        </div>

        <div className="">
          <select
            name=""
            id=""
            style={{ width: "120px", borderRadius: "2px", height: "35px" }}
            onChange={handleMonthData}
            value={monthData}
          >
            <option> Select Value</option>
            {MonthWiseData.map((month, index) => {
              return (
                <>
                  <option value={index + 1} key={index}>
                    <h1>{month}</h1>
                  </option>
                </>
              );
            })}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto mt-24 ml-52 mr-52">
        <Table>
          <Table.Head>
            <Table.HeadCell>Product Overviews</Table.HeadCell>
            <Table.HeadCell>Data</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Total Sold Items
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {data.totalSoldItems}
              </Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Total Unsold Items
              </Table.Cell>
              <Table.Cell>{data.totalUnsoldItems}</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                Total Value
              </Table.Cell>
              <Table.Cell>{data.total.toFixed(2)}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};
