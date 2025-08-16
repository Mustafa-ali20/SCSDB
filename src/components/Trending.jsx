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

function Trending() {
  document.title = "SCSDB | Trending";
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [pages, setPages] = useState(1);

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(
        `/trending/${category}/${duration}?page=${pages}`
      );
      // When changing category/duration, reset the data
      if (pages === 1) {
        settrending(data.results);
      } else {
        settrending((prevState) => [...prevState, ...data.results]);
      }
      setPages(pages + 1);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    setPages(1);
    // GetTrending will be triggered again due to pages state change
  }, [category, duration]);

  useEffect(() => {
    GetTrending();
  }, [pages]); // Now GetTrending depends on pages

  return trending.length > 0 ? (
    <div className="py-[1%] w-screen h-screen overflow-x-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      {/* Desktop Layout */}
      <div className="hidden lg:flex w-full justify-center items-center mb-15">
        <h1 className="px-[3%] text-xl w-[15%] font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line mr-2 hover:text-[#6656CD] transition-all duration-200 cursor-pointer"
          ></i>
          Trending
        </h1>

        <div className="w-[100%]">
          <Topnav />
        </div>

        <div className="space-x-3 w-[24%] flex px-[3%]">
          <Dropdown
            title="Category"
            options={["all", "movie", "tv"]}
            func={(e) => setCategory(e.target.value)}
          />

          <Dropdown
            title="Duration"
            options={["week", "day"]}
            func={(e) => setduration(e.target.value)}
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="w-full flex justify-between">
          <div className="px-5 mb-4 mt-7">
            <h1 className="text-lg font-semibold text-zinc-400 flex items-center ">
              <i
                onClick={() => navigate(-1)}
                className="ri-arrow-left-line mr-2 hover:text-[#6656CD] transition-all duration-200 cursor-pointer"
              ></i>
              Trending
            </h1>
          </div>
          {/* Search Bar - Full Width */}
          <div className="w-[73%] mb-4 mt-3">
            <Topnav />
          </div>
        </div>
        {/* Top Row: Back button and Trending Title */}

        {/* Dropdowns Row */}
        <div className="py-3 w-full flex  mb-6 items-center justify-center">
          <div className="flex items-center justify-center w-[90%] gap-2 pl-2">
            <Dropdown
              title="Category"
              options={["all", "movie", "tv"]}
              func={(e) => setCategory(e.target.value)}
            />

            <Dropdown
              title="Duration"
              options={["week", "day"]}
              func={(e) => setduration(e.target.value)}
            />
          </div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending}
        hasMore={true}
        loader={<h1>Loading...</h1>}
      >
        <div className="w-full bg-[#1f1e24]">
          <Cards data={trending} title="trending" />
        </div>
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Trending;
