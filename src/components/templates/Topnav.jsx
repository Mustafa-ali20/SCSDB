
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import noimage from "/noimage.jpeg";

function Topnav() {
  const [query, setquery] = useState("");
  const [searches, setsearches] = useState([]);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const GetSearches = async () => {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setsearches(data.results);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    GetSearches();
  }, [query]);

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      // Focus the input when expanding
      setTimeout(() => {
        document.getElementById('search-input')?.focus();
      }, 100);
    } else {
      // Clear search when collapsing
      setquery("");
    }
  };

  const clearSearch = () => {
    setquery("");
  };

  return (
    <div className="w-full h-[10vh] relative flex justify-center items-center px-4 lg:px-0">
      {/* Desktop Search (Always visible on large screens) */}
      <div className="hidden lg:flex items-center w-full justify-center">
        <i className="ri-search-line text-2xl text-white mr-4"></i>
        <input
          onChange={(e) => setquery(e.target.value)}
          value={query}
          className="w-[50%] mx-2 p-4 outline-none rounded-full border-none bg-[#333335] text-white placeholder-zinc-400"
          type="text"
          placeholder="Search anything"
        />
        {query.length > 0 && (
          <i
            onClick={clearSearch}
            className="ri-close-fill text-2xl text-white cursor-pointer hover:text-[#6556cd] transition-colors duration-300 ml-2"
          ></i>
        )}
      </div>

      {/* Mobile/Tablet Search */}
      <div className="lg:hidden flex items-center justify-end w-full relative">
        {/* Search Icon Button */}
        <button
          onClick={toggleSearch}
          className="p-2 text-white hover:text-[#6556cd] transition-colors duration-300 z-10"
        >
          <i className={`text-2xl ${isSearchExpanded ? 'ri-close-line' : 'ri-search-line'}`}></i>
        </button>

        {/* Expandable Search Input */}
        <div className={`
          absolute right-0 top-0 h-full
          transition-all duration-300 ease-in-out
          ${isSearchExpanded ? 'w-full opacity-100' : 'w-0 opacity-0'}
        `}>
          <input
            id="search-input"
            onChange={(e) => setquery(e.target.value)}
            value={query}
            className={`
              w-full h-full pr-12 pl-4 outline-none rounded-full border-none 
              bg-[#333335] text-white placeholder-zinc-400
              transition-all duration-300
              ${isSearchExpanded ? 'scale-100' : 'scale-95'}
            `}
            type="text"
            placeholder="Search anything"
          /> 
        </div>
      </div>

      {/* Search Results Dropdown */}
      {query.length > 0 && (
        <div className="absolute w-[90%] sm:w-[80%] lg:w-[50%] max-h-[50vh] bg-zinc-200 top-[87.5%] rounded-lg overflow-auto z-50 shadow-2xl">
          {searches.map((s, i) => (
            <Link
              to={`/${s.media_type}/details/${s.id}`}
              key={i}
              onClick={() => {
                setquery("");
                setIsSearchExpanded(false);
              }}
              className="flex justify-start items-center w-full bg-zinc-100 p-3 sm:p-4 lg:p-6 border-b-2 border-zinc-400 text-zinc-600 font-semibold transition-all duration-300 hover:text-black hover:bg-zinc-300"
            >
              <img
                className="w-12 h-12 sm:w-16 sm:h-16 lg:w-[22vh] lg:h-full object-cover rounded mr-3 sm:mr-4 lg:mr-6 shadow-lg hover:scale-105 transition-transform duration-250 flex-shrink-0"
                src={
                  s.backdrop_path || s.poster_path || s.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        s.backdrop_path || s.poster_path || s.profile_path
                      }`
                    : noimage
                }
                alt=""
              />
              <span className="text-sm sm:text-base lg:text-lg truncate">
                {s.original_title || s.name || s.title}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Topnav;