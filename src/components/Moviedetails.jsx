import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams, Outlet } from "react-router-dom";
import { asyncloadmovie, removemovie } from "../store/actions/movieActions";
import { useNavigate } from "react-router-dom";
import HorizontalCards from "./templates/HorizontalCards";
import Loading from "./templates/Loading";

function Moviedetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
    };
  }, [id]);

  return info ? (
    <>
      <div
        style={{
          background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4), rgba(0,0,0,0.5)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundAttachment: "fixed"
        }}
        className="w-screen min-h-screen overflow-x-hidden"
      >
        {/* Desktop Layout - UNCHANGED */}
        <div className="hidden lg:block px-[10%] relative">
          <nav className="w-full h-[10vh] items-center flex gap-10 text-xl">
            <Link
              onClick={() => navigate(-1)}
              className="ri-arrow-left-line mr-2 hover:text-[#6656CD] hover:scale-115 transition-all duration-200 cursor-pointer"
            ></Link>
            <a
              className="transition-transform duration-300 hover:scale-115 hover:text-[#6656CD]"
              target="_blank"
              href={info.detail.homepage}
            >
              <i className="ri-external-link-line"></i>
            </a>
            <a
              className="transition-transform duration-300 hover:scale-115 hover:text-[#6656CD]"
              target="_blank"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="ri-earth-line"></i>
            </a>
            <a
              target="_blank"
              href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
              className="px-3 py-1 bg-yellow-400 text-white rounded hover:scale-110 hover:bg-yellow-500 transition-all duration-200 font-semibold"
              style={{ textDecoration: "none", display: "inline-block" }}
            >
              IMDb
            </a>
          </nav>

          <div className="w-full flex">
            <img
              className="h-[40vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] rounded-md"
              src={`https://image.tmdb.org/t/p/original/${
                info.detail.backdrop_path || info.detail.poster_path
              }`}
              alt=""
            />

            <div className="content ml-10">
              <h1 className="font-bold text-5xl">
                {info.detail.original_title ||
                  info.detail.title ||
                  info.detail.name ||
                  info.detail.original_name}

                <small className="text-xl font-bold text-zinc-300 ml-4">
                  ({info.detail.release_date.split("-")[0]})
                </small>
              </h1>

              {/* Enhanced Details Section for Desktop */}
              <div className="flex flex-wrap items-center gap-6 mt-6 p-4 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10">
                <div className="flex items-center gap-2 px-3 py-2 bg-yellow-600/20 rounded-lg border border-yellow-400/30">
                  <i className="ri-star-line text-yellow-400"></i>
                  <span className="text-white font-medium">{(info.detail.vote_average * 10).toFixed()}% Score</span>
                </div>
                
                <div className="flex items-center gap-2 px-3 py-2 bg-blue-600/20 rounded-lg border border-blue-400/30">
                  <i className="ri-calendar-line text-blue-400"></i>
                  <span className="text-white font-medium">{info.detail.release_date}</span>
                </div>

                <div className="flex items-center gap-2 px-3 py-2 bg-purple-600/20 rounded-lg border border-purple-400/30">
                  <i className="ri-film-line text-purple-400"></i>
                  <span className="text-white font-medium">{info.detail.genres.map((g) => g.name).join(", ")}</span>
                </div>

                <div className="flex items-center gap-2 px-3 py-2 bg-green-600/20 rounded-lg border border-green-400/30">
                  <i className="ri-time-line text-green-400"></i>
                  <span className="text-white font-medium">{info.detail.runtime} min</span>
                </div>
              </div>

              <h1 className="text-2xl font-semibold mt-8">Overview</h1>
              <p className="text-zinc-100 w-[80%] mt-2">{info.detail.overview}</p>

              <Link
                to={`${pathname}/trailer`}
                className="inline-block px-7 py-2 mt-4 text-lg bg-purple-600 text-white rounded hover:bg-purple-700 transition-all duration-200 font-semibold"
              >
                <i className="ri-play-fill mr-1"></i>
                Trailer
              </Link>
            </div>
          </div>

          <div className="w-[100%] mb-20">
            <div className="mt-15">
              {info.watchproviders && info.watchproviders.flatrate && (
                <div className="flex gap-x-10 items-center mb-10">
                  <h1 className="text-xl font-semibold">Available on Platforms :</h1>
                  {info.watchproviders.flatrate.map((w, i) => (
                    <img
                      title={w.provider_name}
                      key={i}
                      className="w-[5vh] h-[5vh] rounded-md object-cover"
                      src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                      alt=""
                    />
                  ))}
                </div>
              )}

              {info.watchproviders && info.watchproviders.rent && (
                <div className="flex gap-x-10 items-center mb-10">
                  <h1 className="text-xl font-semibold">Available for Rent :</h1>
                  {info.watchproviders.rent.map((w, i) => (
                    <img
                      title={w.provider_name}
                      key={i}
                      className="w-[5vh] h-[5vh] rounded-md object-cover"
                      src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                      alt=""
                    />
                  ))}
                </div>
              )}

              {info.watchproviders && info.watchproviders.buy && (
                <div className="flex gap-x-10 items-center">
                  <h1 className="text-xl font-semibold">Available for Buy :</h1>
                  {info.watchproviders.buy.map((w, i) => (
                    <img
                      title={w.provider_name}
                      key={i}
                      className="w-[5vh] h-[5vh] rounded-md object-cover"
                      src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                      alt=""
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <h1 className="text-2xl font-semibold ml-6 mb-5">Recommendations:</h1>
          <HorizontalCards
            data={
              info?.recommendations?.length > 0
                ? info?.recommendations
                : info?.similar
            }
          />
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden px-4 py-6">
          {/* Top Navigation Icons */}
          <nav className="flex justify-between items-center mb-6">
            <Link
              onClick={() => navigate(-1)}
              className="ri-arrow-left-line text-2xl hover:text-[#6656CD] transition-all duration-200 cursor-pointer p-2"
            ></Link>
            
            <div className="flex items-center gap-4">
              <a
                className="transition-transform duration-300 hover:scale-110 hover:text-[#6656CD] text-xl p-2"
                target="_blank"
                href={info.detail.homepage}
              >
                <i className="ri-external-link-line"></i>
              </a>
              <a
                className="transition-transform duration-300 hover:scale-110 hover:text-[#6656CD] text-xl p-2"
                target="_blank"
                href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
              >
                <i className="ri-earth-line"></i>
              </a>
              <a
                target="_blank"
                href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
                className="px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition-all duration-200 font-semibold text-sm"
              >
                IMDb
              </a>
            </div>
          </nav>

          {/* Movie Poster */}
          <div className="flex justify-center mb-6">
            <img
              className="w-64 h-96 object-cover shadow-2xl rounded-lg"
              src={`https://image.tmdb.org/t/p/original/${
                info.detail.poster_path || info.detail.backdrop_path
              }`}
              alt=""
            />
          </div>

          {/* Movie Title */}
          <div className="text-center mb-6">
            <h1 className="font-bold text-2xl leading-tight">
              {info.detail.original_title ||
                info.detail.title ||
                info.detail.name ||
                info.detail.original_name}
            </h1>
            <p className="text-lg text-zinc-300 mt-1">
              ({info.detail.release_date.split("-")[0]})
            </p>
          </div>

          {/* Enhanced Details Section for Mobile */}
          <div className="mb-6">
            {/* Details Grid */}
            <div className="grid grid-cols-1 gap-3 mb-4">
              <div className="flex items-center justify-center gap-2 px-4 py-3 bg-yellow-600/20 rounded-lg border border-yellow-400/30 backdrop-blur-sm">
                <i className="ri-star-line text-yellow-400 text-lg"></i>
                <span className="text-white font-medium">{(info.detail.vote_average * 10).toFixed()}% User Score</span>
              </div>

              <div className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600/20 rounded-lg border border-blue-400/30 backdrop-blur-sm">
                <i className="ri-calendar-line text-blue-400 text-lg"></i>
                <span className="text-white font-medium">{info.detail.release_date}</span>
              </div>

              <div className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600/20 rounded-lg border border-green-400/30 backdrop-blur-sm">
                <i className="ri-time-line text-green-400 text-lg"></i>
                <span className="text-white font-medium">{info.detail.runtime} minutes</span>
              </div>

              <div className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-600/20 rounded-lg border border-purple-400/30 backdrop-blur-sm text-center">
                <i className="ri-film-line text-purple-400 text-lg"></i>
                <span className="text-white font-medium">{info.detail.genres.map((g) => g.name).join(", ")}</span>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-3 text-center">Overview</h2>
            <p className="text-zinc-300 leading-relaxed text-center">{info.detail.overview}</p>
          </div>

          {/* Trailer Button */}
          <div className="text-center mb-8">
            <Link
              to={`${pathname}/trailer`}
              className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 font-semibold"
            >
              <i className="ri-play-fill mr-2"></i>
              Watch Trailer
            </Link>
          </div>

          {/* Watch Providers */}
          <div className="mb-8">
            {info.watchproviders && info.watchproviders.flatrate && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-center">Available on Platforms</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {info.watchproviders.flatrate.map((w, i) => (
                    <img
                      title={w.provider_name}
                      key={i}
                      className="w-12 h-12 rounded-lg object-cover shadow-lg"
                      src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                      alt=""
                    />
                  ))}
                </div>
              </div>
            )}

            {info.watchproviders && info.watchproviders.rent && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-center">Available for Rent</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {info.watchproviders.rent.map((w, i) => (
                    <img
                      title={w.provider_name}
                      key={i}
                      className="w-12 h-12 rounded-lg object-cover shadow-lg"
                      src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                      alt=""
                    />
                  ))}
                </div>
              </div>
            )}

            {info.watchproviders && info.watchproviders.buy && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-center">Available for Purchase</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {info.watchproviders.buy.map((w, i) => (
                    <img
                      title={w.provider_name}
                      key={i}
                      className="w-12 h-12 rounded-lg object-cover shadow-lg"
                      src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                      alt=""
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Recommendations */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-center">Recommendations</h2>
            <HorizontalCards
              data={
                info?.recommendations?.length > 0
                  ? info?.recommendations
                  : info?.similar
              }
            />
          </div>
        </div>

        <Outlet />
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Moviedetails;