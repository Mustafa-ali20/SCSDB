
import React from "react";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { Link } from "react-router-dom";
import noimage from "/noimage.jpeg";

function HorizontalCards({ data }) {
  const [details, setDetails] = useState({});

  const fetchDetails = async (id, type) => {
    try {
      const { data } = await axios.get(`/${type}/${id}`);
      setDetails((prev) => ({
        ...prev,
        [id]: {
          runtime:
            type === "movie"
              ? data.runtime
              : data.episode_run_time?.[0] || null,
          number_of_seasons: type === "tv" ? data.number_of_seasons : null,
        },
      }));
    } catch (error) {
      console.log("Detail fetch error:", error);
    }
  };

  useEffect(() => {
    data?.forEach((d) => {
      if (!details[d.id]) {
        fetchDetails(d.id, d.media_type);
      }
    });
  }, [data]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-0">
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 ">
        {data?.length > 0 ? (
          data.map((d, i) => {
            const title = (
              d.original_title ||
              d.title ||
              d.name ||
              d.original_name
            ).slice(0, 24);
            const year = (d.release_date || d.first_air_date || "").slice(0, 4);
            const runtime = details[d.id]?.runtime;

            return (
              <Link
                to={`/${d.media_type || "movie"}/details/${d.id}`}
                key={i}
                className="flex flex-col group"
              >
                {/* Image */}
                <div className="relative overflow-hidden rounded-lg shadow-lg lg:shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]">
                  <img
                    className="w-full h-32 sm:h-40 md:h-44 lg:h-[22vh] object-cover object-center transition-transform duration-300 group-hover:scale-105 lg:group-hover:scale-104"
                    src={
                      d.backdrop_path || d.poster_path
                        ? `https://image.tmdb.org/t/p/original/${
                            d.backdrop_path || d.poster_path
                          }`
                        : noimage
                    }
                    alt={title}
                  />
                  
                  {/* Media Type Badge - Only on mobile/tablet */}
                  {d.media_type && (
                    <div className="absolute top-2 right-2 lg:hidden">
                      <span className="px-1.5 py-0.5 text-xs bg-black/70 text-white rounded uppercase tracking-wide">
                        {d.media_type === "movie" ? "Movie" : d.media_type === "tv" ? "TV" : ""}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="mt-2 flex-1 ">
                  {/* Title */}
                  <h3 className="text-sm sm:text-base lg:text-xl lg:font-semibold lg:w-[80%] lg:mt-2 lg:h-fit font-semibold text-white leading-tight mb-2 line-clamp-2 group-hover:text-[#6556cd] transition-colors duration-200">
                    {(d.original_title || d.title || d.name || d.original_name).length > 24
                      ? `${title}...`
                      : title}
                  </h3>

                  {/* Year and Additional Info */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 lg:mt-1 lg:mb-6 lg:flex lg:justify-between lg:items-center gap-1 text-xs sm:text-sm lg:text-sm text-gray-300 lg:text-gray-300">
                    <div className="flex items-center gap-2 lg:flex lg:space-x-2">
                      {year && <span>{year}</span>}

                      {/* Runtime for movies */}
                      {d.media_type === "movie" && runtime && (
                        <>
                          <span className="text-zinc-50 lg:text-zinc-50 lg:mr-1">•</span>
                          <span>{runtime}m</span>
                        </>
                      )}

                      {/* Seasons for TV shows */}
                      {d.media_type === "tv" && details[d.id]?.number_of_seasons && (
                        <>
                          <span className="text-zinc-50 lg:text-zinc-50 lg:mr-1">•</span>
                          <span>
                            {details[d.id].number_of_seasons} Season{details[d.id].number_of_seasons > 1 ? "s" : ""}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Media type badge - Large screen only */}
                    {d.media_type && (
                      <span className="hidden lg:inline px-2 py-0.5 border rounded-md uppercase tracking-wide text-zinc-300">
                        {d.media_type === "movie"
                          ? "Movie"
                          : d.media_type === "tv"
                          ? "TV Show"
                          : ""}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="col-span-full lg:flex lg:justify-between lg:items-center flex justify-center items-center text-gray-300 text-sm lg:text-md py-8">
            <span>No content available</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default HorizontalCards;