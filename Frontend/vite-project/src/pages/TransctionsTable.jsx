import React, { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import "./transction.css";

export const TransctionsTable = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [monthData, setMonthData] = useState("");
  const [limit, setLimit] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const currentPage = useRef();

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

  const fetchProducts = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/products/getproducts`);
      const data = await res.json();

      if (res.ok) {
        setProducts(data.myData);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

      if (res.ok) {
        setProducts(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //*****************search **************************************/
  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    try {
      const res = await fetch(
        `http://localhost:3000/api/products/getsearch?search=${searchQuery}`
      );
      const data = await res.json();

      if (res.ok) {
        setProducts(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ***********************

  const handlePageClick = async (e) => {
    console.log(e);
    currentPage.current = e.selected + 1;
    getPaginatedUser();
  };
  const getPaginatedUser = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/products/paginate?page=${currentPage.current}&limit=${limit}`
      );
      const data = await res.json();

      setPageCount(data.pageCount);

      if (res.ok) {
        setProducts(data.paginateData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  useEffect(() => {
    fetchProducts();
    currentPage.current = 1;
    getPaginatedUser();
  }, []);

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
                value={searchQuery}
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
          <ReactPaginate
            className="flex space-x-5 justify-center mt-4 mb-8  "
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            marginPagesDisplayed={2}
            containerClassName="pagination justify-content-center"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
            forcePage={currentPage.current - 1}
          />
        </div>
      </div>
    </>
  );
};
