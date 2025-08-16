
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Cards from "./templates/Cards";
import Loading from "./templates/Loading";
import Topnav from "./templates/Topnav";
import Dropdown from "./templates/Dropdown";
import InfiniteScroll from "react-infinite-scroll-component";

function Popular() {
  document.title = "SCSDB | Popular";
  const navigate = useNavigate();
  const [category, setCategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [pages, setPages] = useState(1);

  const GetPopular = async () => {
    try {
      const { data } = await axios.get(
        `${category}/popular?page=${pages}`
      );
      // When changing category/duration, reset the data
      if (pages === 1) {
        setpopular(data.results);
      } else {
        setpopular((prevState) => [...prevState, ...data.results]);
      }
      setPages(pages + 1);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    setPages(1);
    // GetPopular will be triggered again due to pages state change
  }, [category]);

  useEffect(() => {
    GetPopular();
  }, [pages]); // Now GetPopular depends on pages

  return popular.length > 0 ? (
    <div className="py-[1%] w-screen h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black overflow-x-hidden ">
      {/* Desktop Layout */}
      <div className="hidden lg:flex w-full justify-center items-center mb-15">
        <h1 className="px-[3%] text-xl w-[15%] font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line mr-2 hover:text-[#6656CD] transition-all duration-200 cursor-pointer"
          ></i>
          Popular
        </h1>

        <div className="w-[100%]">
          <Topnav />
        </div>

        <div className="space-x-3 w-[20%] flex px-[3%]">
          <Dropdown
            title="Category"
            options={["tv", "movie"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Top Row: Title and Search Bar */}
        <div className="w-full flex justify-between">
          <div className="px-5 mb-4 mt-7">
            <h1 className="text-lg font-semibold text-zinc-400 flex items-center">
              <i
                onClick={() => navigate(-1)}
                className="ri-arrow-left-line mr-2 hover:text-[#6656CD] transition-all duration-200 cursor-pointer"
              ></i>
              Popular
            </h1>
          </div>
          {/* Search Bar */}
          <div className="w-[73%] mb-4">
            <Topnav />
          </div>
        </div>

        {/* Dropdowns Row */}
        <div className="px-4 flex gap-3 mb-6 items-center justify-center">
          <Dropdown
            title="Category"
            options={["tv", "movie"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={popular.length}
        next={GetPopular}
        hasMore={true}
        loader={<h1>Loading...</h1>}
      >
        <div className="w-full bg-[#1f1e24]">
          <Cards data={popular} title={category} />
        </div>
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Popular;