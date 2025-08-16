import React from "react";
import { useState, useEffect } from "react";
import Sidenav from "./templates/Sidenav";
import Topnav from "./templates/Topnav";
import axios from "../utils/axios";
import Header from "./templates/Header";
import HorizontalCards from "./templates/HorizontalCards";
import Dropdown from "./templates/Dropdown";
import Loading from "./templates/Loading";

function Home() {
  document.title = "SCSDB | Homepage";
  const [wallpaper, setwallpaper] = useState();
  const [trending, settrending] = useState();
  const [category, setcategory] = useState("all");

  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomdata =
        data.results[(Math.random() * data.results.length).toFixed()];
      setwallpaper(randomdata);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      settrending(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    !wallpaper && GetHeaderWallpaper();
    GetTrending();
  }, [category]);

  return wallpaper && trending ? (
    <>
      {/* Large Screen Layout - UNCHANGED ORIGINAL */}
      <div className="hidden lg:flex h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
        <Sidenav />

        {/* Main Content Area */}
        <div className="w-full lg:w-[80%] h-full overflow-auto overflow-x-hidden ml-0 lg:ml-0">
          {/* Top Navigation */}
          <div className="mt-12 lg:mt-0">
            <Topnav />
          </div>

          {/* Header */}
          <Header data={wallpaper} />

          {/* Trending Section */}
          <div className="px-4 lg:px-5">
            <div className="mb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-2 lg:p-5">
              <h1 className="text-xl lg:text-2xl font-bold flex justify-center mt-2 lg:mt-3 mb-4 lg:mb-8 uppercase underline underline-offset-6">
                Trending
              </h1>
              <Dropdown
                title="Filter"
                options={["all", "movie", "tv"]}
                func={(e) => setcategory(e.target.value)}
              />
            </div>

            {/* Horizontal Cards */}
            <HorizontalCards data={trending} />
          </div>
        </div>
      </div>

      {/* Mobile Screen Layout - VERSION 3 PERFECT LAYERING */}
      <div className="lg:hidden flex h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black relative">
        {/* Sidenav - positioned absolute on top-left, overlaying header */}
        <div className="w-full absolute">
          <div className="absolute top-0 left-0 z-30">
            <Sidenav />
          </div>
          <div className="absolute top-1 right-0 z-20 w-[87%]">
            <Topnav />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-full h-full overflow-auto overflow-x-hidden">
          {/* Top Navigation - positioned absolute on top-right, overlaying header */}

          {/* Header - base layer */}
          <div className="relative z-10">
            <Header data={wallpaper} />
          </div>

          {/* Trending Section */}
          <div className="px-4">
            <div className="mb-5 flex sm:flex-row justify-between items-start sm:items-center gap-3 p-2 ">
              <h1 className="text-xl font-bold flex justify-center mt-2 mb-4 uppercase underline underline-offset-6">
                Trending
              </h1>
              <div className="mt-1">
                <Dropdown
                  title="Filter"
                  options={["all", "movie", "tv"]}
                  func={(e) => setcategory(e.target.value)}
                />
              </div>
            </div>

            {/* Horizontal Cards */}
            <HorizontalCards data={trending} />
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Home;
