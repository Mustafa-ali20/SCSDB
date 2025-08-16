import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import noimage from "/noimage.jpeg";

function Cards({ data, title }) {
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
    <div className="w-full bg-gradient-to-b from-gray-900 via-gray-800 to-black px-4 lg:px-0">
      {/* Mobile: 2 cards per row */}
      <div className="grid grid-cols-2 sm:hidden gap-3">
        {data.map((card, i) => (
          <Link
            to={`/${card.media_type || title}/details/${card.id}`}
            key={i}
            className="group"
          >
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img
                className="w-full h-32 object-cover object-center transition-transform duration-300 group-hover:scale-105"
                src={
                  card.backdrop_path || card.poster_path || card.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        card.backdrop_path ||
                        card.poster_path ||
                        card.profile_path
                      }`
                    : noimage
                }
                alt=""
              />
            </div>
            <h3 className="text-sm font-semibold text-white leading-tight mb-2 line-clamp-2 group-hover:text-[#6556cd] transition-colors duration-200 mt-2">
              {(
                card.original_title ||
                card.title ||
                card.name ||
                card.original_name
              ).length > 20
                ? `${(
                    card.original_title ||
                    card.title ||
                    card.name ||
                    card.original_name
                  ).slice(0, 20)}...`
                : card.original_title ||
                  card.title ||
                  card.name ||
                  card.original_name}
            </h3>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between pr-1 mb-2.5">
                <div className="text-xs text-zinc-300 flex gap-1">
                  {(card.release_date || card.first_air_date) && (
                    <p>
                      {(card.release_date || card.first_air_date).slice(0, 4)}
                    </p>
                  )}
                  {details[card.id] && (
                    <>
                      {card.media_type === "tv" &&
                        details[card.id].number_of_seasons && (
                          <>
                            <span>•</span>
                            <p>S{details[card.id].number_of_seasons}</p>
                          </>
                        )}
                      {card.media_type === "movie" &&
                        details[card.id].runtime && (
                          <>
                            <span>•</span>
                            <p>{details[card.id].runtime}m</p>
                          </>
                        )}
                    </>
                  )}
                </div>
                <div>
                  {card.media_type && (
                    <span className="px-1 py-0.5 bg-[#2f2e31] text-xs rounded uppercase tracking-wide text-zinc-300 self-start">
                      {card.media_type === "movie"
                        ? "Movie"
                        : card.media_type === "tv"
                        ? "TV"
                        : ""}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Tablet: 3 cards per row */}
      <div className="hidden sm:grid md:hidden grid-cols-3 gap-4">
        {data.map((card, i) => (
          <Link
            to={`/${card.media_type || title}/details/${card.id}`}
            key={i}
            className="group"
          >
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img
                className="w-full h-40 object-cover object-center transition-transform duration-300 group-hover:scale-105"
                src={
                  card.backdrop_path || card.poster_path || card.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        card.backdrop_path ||
                        card.poster_path ||
                        card.profile_path
                      }`
                    : noimage
                }
                alt=""
              />
            </div>
            <h3 className="text-base font-semibold text-white leading-tight mb-2 line-clamp-2 group-hover:text-[#6556cd] transition-colors duration-200 mt-2">
              {(
                card.original_title ||
                card.title ||
                card.name ||
                card.original_name
              ).length > 22
                ? `${(
                    card.original_title ||
                    card.title ||
                    card.name ||
                    card.original_name
                  ).slice(0, 22)}...`
                : card.original_title ||
                  card.title ||
                  card.name ||
                  card.original_name}
            </h3>
            <div className="flex justify-between items-start">
              <div className="text-sm flex text-zinc-300 gap-1">
                {(card.release_date || card.first_air_date) && (
                  <p>
                    {(card.release_date || card.first_air_date).slice(0, 4)}
                  </p>
                )}
                {details[card.id] && (
                  <>
                    {card.media_type === "tv" &&
                      details[card.id].number_of_seasons && (
                        <>
                          <span>•</span>
                          <p>Season {details[card.id].number_of_seasons}</p>
                        </>
                      )}
                    {card.media_type === "movie" &&
                      details[card.id].runtime && (
                        <>
                          <span>•</span>
                          <p>{details[card.id].runtime}m</p>
                        </>
                      )}
                  </>
                )}
              </div>
              {card.media_type && (
                <span className="px-2 py-1 bg-[#2f2e31] text-xs rounded uppercase tracking-wide text-zinc-300">
                  {card.media_type === "movie"
                    ? "Movie"
                    : card.media_type === "tv"
                    ? "TV"
                    : ""}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Desktop: 5 cards per row - UNCHANGED LAYOUT */}
      <div className="hidden md:flex justify-center items-center flex-wrap w-full bg-gradient-to-b from-gray-900 via-gray-800 to-black">
        {data.map((card, i) => (
          <Link
            to={`/${card.media_type || title}/details/${card.id}`}
            key={i}
            className="w-[30vh] mr-15 mb-[5%] group"
          >
            <div className="relative overflow-hidden rounded-lg shadow-lg lg:shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]">
              <img
                className="h-[40vh] w-full object-cover object-center transition-transform duration-300 group-hover:scale-105 lg:group-hover:scale-104"
                src={
                  card.backdrop_path || card.poster_path || card.profile_path
                    ? `https://image.tmdb.org/t/p/original/${
                        card.backdrop_path ||
                        card.poster_path ||
                        card.profile_path
                      }`
                    : noimage
                }
                alt=""
              />
            </div>
            <h3 className="text-xl font-semibold w-[80%] mt-2 h-fit text-white leading-tight mb-2 line-clamp-2 group-hover:text-[#6556cd] transition-colors duration-200">
              {(
                card.original_title ||
                card.title ||
                card.name ||
                card.original_name
              ).length > 20
                ? `${(
                    card.original_title ||
                    card.title ||
                    card.name ||
                    card.original_name
                  ).slice(0, 20)}...`
                : card.original_title ||
                  card.title ||
                  card.name ||
                  card.original_name}
            </h3>
            <div className="flex justify-between items-center">
              <div className="text-sm flex text-zinc-300 mt-1 gap-1">
                {(card.release_date || card.first_air_date) && (
                  <p>
                    {(card.release_date || card.first_air_date).slice(0, 4)}
                  </p>
                )}

                {details[card.id] && (
                  <>
                    {card.media_type === "tv" &&
                      details[card.id].number_of_seasons && (
                        <>
                          <span>•</span>
                          <p>Season {details[card.id].number_of_seasons}</p>
                        </>
                      )}
                    {card.media_type === "movie" &&
                      details[card.id].runtime && (
                        <>
                          <span>•</span>
                          <p>{details[card.id].runtime}m</p>
                        </>
                      )}
                  </>
                )}
              </div>
              {card.media_type && (
                <span className="px-2 py-1 bg-[#2f2e31] text-sm rounded-md uppercase tracking-wide text-zinc-300">
                  {card.media_type === "movie"
                    ? "Movie"
                    : card.media_type === "tv"
                    ? "TV Show"
                    : ""}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Cards;
