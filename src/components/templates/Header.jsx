
import React from "react";
import { Link } from "react-router-dom";

function Header({ data }) {
  return (
    <div
      style={{
        backgroundImage: `
          linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6), rgba(0,0,0,0.2)), 
          url(https://image.tmdb.org/t/p/original/${
            data.backdrop_path || data.poster_path
          })
        `,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        maskImage: `linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)`,
        WebkitMaskImage: `linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)`,
      }}
      className="w-full h-[40vh] sm:h-[45vh] lg:h-[60vh] flex flex-col justify-end px-4 sm:px-6 lg:pl-[8%] items-start pb-4 sm:pb-6 lg:pb-[5%]"
    >
      {/* Title */}
      <h1 className="text-xl sm:text-2xl lg:text-5xl w-full sm:w-[90%] lg:w-[70%] font-black mb-2 sm:mb-3 lg:mb-5 leading-tight">
        {data.original_title || data.name || data.title}
      </h1>

      {/* Overview - Hidden on mobile/tablet, shown on large screens */}
      <p className="hidden lg:block w-[55%] text-lg leading-relaxed mb-3">
        {data.overview.slice(0, 200)}...{" "}
        <Link
          to={`/${data.media_type}/details/${data.id}`}
          className="text-blue-500"
        >
          more
        </Link>
      </p>

      {/* Release Date and Media Type */}
      <p className="mt-1 sm:mt-2 lg:mt-3 text-xs sm:text-sm lg:text-base">
        {data.release_date && (
          <>
            <i className="ri-megaphone-fill mr-0.5"></i> {data.release_date}
          </>
        )}
        <i className="ri-movie-line ml-3 mr-0.5"></i>{" "}
        {data.media_type?.toUpperCase()}
      </p>

      {/* Trailer Button */}
      <Link
        to={`${data.media_type}/details/${data.id}/trailer`}
        className="bg-[#6556cd] mt-2 sm:mt-3 lg:mt-4 flex items-center justify-center text-white px-3 py-1.5 sm:px-4 sm:py-2 lg:px-4 lg:py-2 rounded-md border-2 border-transparent transition duration-300 hover:bg-transparent hover:border-[#6556cd] hover:text-[#6556cd] text-xs sm:text-sm lg:text-base"
      >
        <i className="ri-play-fill mr-1"></i>
        Trailer
      </Link>
    </div>
  );
}

export default Header;