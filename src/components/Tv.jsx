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

function Tv() {
  document.title = "SCSDB | Tv Shows";
  const navigate = useNavigate();
  const [category, setCategory] = useState("airing_today");
  const [tv, setTv] = useState([]);
  const [pages, setPages] = useState(1);
  
  const GetTv = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${pages}`);
      // When changing category/duration, reset the data
      if (pages === 1) {
        setTv(data.results);
      } else {
        setTv((prevState) => [...prevState, ...data.results]);
      }
      setPages(pages + 1);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    setPages(1);
    // GetTv will be triggered again due to pages state change
  }, [category]);

  useEffect(() => {
    GetTv();
  }, [pages]); // Now GetTv depends on pages
  
  return tv.length > 0 ? (
    <div className="py-[1%] w-screen h-screen bg-[#1f1e24] overflow-x-hidden bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      {/* Desktop Layout */}
      <div className="hidden lg:flex w-full justify-center items-center mb-15">
        <h1 className="px-[3%] text-xl w-[15%] font-semibold text-zinc-400">
          <i
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line mr-2 hover:text-[#6556CD] hover:scale-125 transition-all duration-200 cursor-pointer"
          ></i>
          Tv
        </h1>

        <div className="w-[100%]">
          <Topnav />
        </div>

        <div className="space-x-3 w-[20%] flex px-[3%]">
          <Dropdown
            title="Category"
            options={["on_the_air", "popular", "top_rated", "airing_today"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Top Row: Title and Search Bar */}
        <div className="w-full flex justify-between">
          <div className="px-5 mb-4 mt-7 w-[45%]">
            <h1 className="text-lg font-semibold text-zinc-400 flex items-center">
              <i
                onClick={() => navigate(-1)}
                className="ri-arrow-left-line mr-2 hover:text-[#6556CD] hover:scale-125 transition-all duration-200 cursor-pointer"
              ></i>
              TV Shows
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
            options={["on_the_air", "popular", "top_rated", "airing_today"]}
            func={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={tv.length}
        next={GetTv}
        hasMore={true}
        loader={<h1>Loading...</h1>}
      >
        <div className="w-full bg-[#1f1e24]">
          <Cards data={tv} title="tv" />
        </div>
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Tv;