import React, { useEffect, useState } from "react";
import { Table, TableCell, TableHead, TableHeadCell } from "flowbite-react";
import "./transction.css";

export const TransctionsTable = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [monthData, setMonthData] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageLimit] = useState(10);

  const sortOptions = ["title", "description", "price", "category"];
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

  const fetchProducts = async (page, limit, increase) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/products/getproducts?page=${page}&limit=${limit}`
      );
      const data = await res.json();

      if (res.ok) {
        setProducts(data.myData);
        setCurrentPage(currentPage + increase);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts(0, 10, 0);
  }, []);

  // ********************************Get Sort Data********************************

  const handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    try {
      const res = await fetch(
        `http://localhost:3000/api/products/getproducts?sort=${value}`
      );
      const data = await res.json();

      if (res.ok) {
        setProducts(data.myData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ***************************Get Month Wise Data**********************
  const handleMonthData = async (e) => {
    let value = e.target.value;
    setMonthData(value);

    try {
      const res = await fetch(
        `http://localhost:3000/api/products/monthdata?month=${value}`
      );
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setProducts(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //  *****************************pagination Functionality*************************
  const showPagination = () => {
    if (currentPage === 0) {
      return (
        <>
          <div className="flex space-x-5 ">
            <button className="border-2 black w-20 text-black">1</button>
            <button
              className="border-2 black w-20 text-black bg-green-500"
              onClick={() => fetchProducts(2, 10, 1)}
            >
              Next
            </button>
          </div>
        </>
      );
    } else if (currentPage < pageLimit - 1 && products.length === pageLimit) {
      return (
        <>
          <div className="flex space-x-5 ">
            <button
              className="border-2 black w-20 text-black bg-green-500"
              onClick={() =>
                fetchProducts((currentPage - 1) * 10, currentPage * 10, -1)
              }
            >
              Prev
            </button>
            <button className="border-2 black w-20 text-black">
              {currentPage + 1}
            </button>
            <button
              className="border-2 black w-20 text-black bg-green-500"
              onClick={() =>
                fetchProducts(currentPage + 1, (currentPage + 2) * 10, 1)
              }
            >
              Next
            </button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="flex space-x-5 ">
            <button
              className="border-2 black w-20 text-black bg-green-500"
              onClick={() => fetchProducts(10, 20, -1)}
            >
              Prev
            </button>
            <button className="border-2 black w-20 text-black">
              {currentPage + 1}
            </button>
          </div>
        </>
      );
    }
  };

  //*****************search **************************************/
  const handleSearch = async (e) => {
    let value = e.target.value;
    setSearch(value);
    try {
      const res = await fetch(
        `http://localhost:3000/api/products/getproducts?title=${search}`
      );
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setProducts(data.myData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleSearch();
  }, [search]);

  return (
    <>
      <div className="border-2 black h-full ">
        <div className=" font-bold text-2xl mt-5">Transctions Dashboar</div>
        <div className="">
          <div className="">
            <div className="ml-[800px] mt-11">
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
          <div className="">
            <div className="ml-[999px] mt-[-40px]">
              <div className="border-2 black w-40">
                <select
                  name=""
                  id=""
                  style={{
                    width: "120px",
                    borderRadius: "2px",
                    height: "35px",
                  }}
                  onChange={handleSort}
                  value={sortValue}
                >
                  <option>Sort By</option>
                  {sortOptions.map((item, index) => {
                    return (
                      <>
                        <option value={item} key={index}>
                          {item}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-11">
          <div className="ml-32">
            <form action="">
              <input
                type="text"
                placeholder="Search"
                className="border-2 black mb-4 p-1"
                value={search}
                onChange={handleSearch}
              />
            </form>
          </div>
        </div>

        <div className="">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 &&
                products != undefined &&
                products.map((product, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>{index + 1}</td>

                        <td className="">
                          {product.title.length > 25
                            ? product.title.substring(0, 25) + "..."
                            : product.title}
                        </td>
                        <td>
                          {product.description.length > 25
                            ? product.description.substring(0, 25) + "..."
                            : product.description}
                        </td>
                        <td>{product.price}</td>
                        <td>{product.category}</td>
                        <td>
                          <img
                            src={product.image}
                            alt="id"
                            width="25px"
                            height="25px"
                          />
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
          <div className="mx-auto p-14 max-w-[400px] align-middle">
            {showPagination()}
          </div>
        </div>
      </div>
    </>
  );
};
