import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams, Outlet } from "react-router-dom";
import { asyncloadpeople, removepeople } from "../store/actions/peopleActions";
import { useNavigate } from "react-router-dom";
import HorizontalCards from "./templates/HorizontalCards";
import Loading from "./templates/Loading";

function Persondetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { info } = useSelector((state) => state.people);
  
  useEffect(() => {
    dispatch(asyncloadpeople(id));
    return () => {
      dispatch(removepeople());
    };
  }, [id]);

  return info ? (
    <div className="w-screen min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black overflow-x-hidden">
      {/* Desktop Layout - Enhanced with modern styling */}
      <div className="hidden lg:block">
        <Link
          onClick={() => navigate(-1)}
          className="ri-arrow-left-line mr-2 hover:text-[#6656CD] hover:scale-125 transition-all duration-200 absolute top-13 left-40 text-2xl"
        ></Link>
        <div className="px-[10%] w-screen overflow-x-auto">
          {/* Part 1 navigation */}
          <nav className="h-[10vh] w-full text-zinc-100 flex items-center gap-10 text-xl"></nav>

          {/* Part 2 person poster */}
          <div className="w-full flex">
            <div className="w-[20%]">
              <img
                className="h-[40vh] w-[20vw] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)] rounded-md transition-transform duration-200 hover:scale-102"
                src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
                alt=""
              />
              
              {/* Enhanced Social Media Links */}
              <div className="flex justify-between mt-4 w-[15.8vw]">
                <a
                  target="_blank"
                  href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
                  className="group flex items-center justify-center w-12 h-12 p-2 bg-gray-800/50 rounded-full backdrop-blur-sm border border-gray-600/30 transition-all duration-300 hover:scale-110 hover:bg-green-600/20 hover:border-green-400/50 hover:shadow-lg hover:shadow-blue-400/20"
                >
                  <i className="ri-earth-line text-xl text-white group-hover:text-emerald-400 transition-colors duration-300"></i>
                </a>
                <a
                  target="_blank"
                  href={`https://www.facebook.com/${info.externalid.facebook_id}`}
                  className="group flex items-center justify-center w-12 h-12 p-2 bg-gray-800/50 rounded-full backdrop-blur-sm border border-gray-600/30 transition-all duration-300 hover:scale-110 hover:bg-blue-600/20 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-400/20"
                >
                  <i className="ri-facebook-box-fill text-xl text-white group-hover:text-blue-400 transition-colors duration-300"></i>
                </a>
                <a
                  target="_blank"
                  href={`https://www.instagram.com/${info.externalid.instagram_id}`}
                  className="group flex items-center justify-center w-12 h-12 p-2 bg-gray-800/50 rounded-full backdrop-blur-sm border border-gray-600/30 transition-all duration-300 hover:scale-110 hover:bg-pink-600/20 hover:border-pink-400/50 hover:shadow-lg hover:shadow-pink-400/20"
                >
                  <i className="ri-instagram-line text-xl text-white group-hover:text-pink-400 transition-colors duration-300"></i>
                </a>
                <a
                  target="_blank"
                  href={`https://www.x.com/${info.externalid.twitter_id}`}
                  className="group flex items-center justify-center w-12 h-12 p-2 bg-gray-800/50 rounded-full backdrop-blur-sm border border-gray-600/30 transition-all duration-300 hover:scale-110 hover:bg-gray-600/20 hover:border-gray-400/50 hover:shadow-lg hover:shadow-gray-400/20"
                >
                  <i className="ri-twitter-x-line text-xl text-white group-hover:text-gray-300 transition-colors duration-300"></i>
                </a>
              </div>

              {/* Enhanced Actor Information Section */}
              <div className="mt-6 p-4 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10">
                <h1 className="text-2xl text-white mb-4 font-semibold">Actor Information</h1>
                
                <div className="space-y-4">
                  <div className="flex flex-col gap-1 px-3 py-2 bg-purple-600/20 rounded-lg border border-purple-400/30">
                    <span className="text-purple-400 font-medium text-sm">Known for</span>
                    <span className="text-white">{info.detail.known_for_department}</span>
                  </div>

                  <div className="flex flex-col gap-1 px-3 py-2 bg-blue-600/20 rounded-lg border border-blue-400/30">
                    <span className="text-blue-400 font-medium text-sm">Gender</span>
                    <span className="text-white">{info.detail.gender === 2 ? "Male" : "Female"}</span>
                  </div>

                  <div className="flex flex-col gap-1 px-3 py-2 bg-green-600/20 rounded-lg border border-green-400/30">
                    <span className="text-green-400 font-medium text-sm">Date of Birth</span>
                    <span className="text-white">{info.detail.birthday}</span>
                  </div>

                  <div className="flex flex-col gap-1 px-3 py-2 bg-yellow-600/20 rounded-lg border border-yellow-400/30">
                    <span className="text-yellow-400 font-medium text-sm">Place of Birth</span>
                    <span className="text-white">{info.detail.place_of_birth}</span>
                  </div>

                  {info.detail.deathday && (
                    <div className="flex flex-col gap-1 px-3 py-2 bg-red-600/20 rounded-lg border border-red-400/30">
                      <span className="text-red-400 font-medium text-sm">Date of Death</span>
                      <span className="text-white">{info.detail.deathday}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Part 3 person details */}
            <div className="w-[80%] ml-8">
              <h1 className="text-5xl font-bold">{info.detail.name}</h1>
              
              {/* Enhanced Biography Section with Glassy Background */}
              <div className="mt-6 p-6 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10">
                <h1 className="text-2xl font-semibold text-white mb-4">Biography</h1>
                <p className="text-lg text-zinc-300 leading-relaxed">
                  {info.detail.biography}
                </p>
              </div>

              <h1 className="text-2xl font-semibold text-zinc-200 mt-8 mb-5">
                Movies and Shows
              </h1>
              <HorizontalCards data={info.combinedCredits.cast} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden px-4 py-6">
        {/* Navigation */}
        <nav className="flex justify-start items-center mb-6">
          <Link
            onClick={() => navigate(-1)}
            className="ri-arrow-left-line text-2xl hover:text-[#6656CD] transition-all duration-200 cursor-pointer p-2"
          ></Link>
        </nav>

        {/* Actor Image */}
        <div className="flex justify-center mb-6">
          <img
            className="w-64 h-80 object-cover shadow-2xl rounded-lg"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt=""
          />
        </div>

        {/* Actor Name */}
        <div className="text-center mb-6">
          <h1 className="font-bold text-3xl leading-tight text-white">
            {info.detail.name}
          </h1>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-6 mb-8">
          <a
            target="_blank"
            href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            className="w-12 h-12 flex items-center justify-center bg-gray-800/50 rounded-full backdrop-blur-sm border border-gray-600/30 transition-all duration-300 hover:scale-110 hover:bg-blue-600/20 hover:border-blue-400/50 hover:shadow-lg hover:shadow-green-400/20"
          >
            <i className="ri-earth-line text-xl text-white"></i>
          </a>
          <a
            target="_blank"
            href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            className="w-12 h-12 flex items-center justify-center bg-gray-800/50 rounded-full backdrop-blur-sm border border-gray-600/30 transition-all duration-300 hover:scale-110 hover:bg-blue-600/20 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-400/20"
          >
            <i className="ri-facebook-box-fill text-xl text-blue-400"></i>
          </a>
          <a
            target="_blank"
            href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            className="w-12 h-12 flex items-center justify-center bg-gray-800/50 rounded-full backdrop-blur-sm border border-gray-600/30 transition-all duration-300 hover:scale-110 hover:bg-pink-600/20 hover:border-pink-400/50 hover:shadow-lg hover:shadow-pink-400/20"
          >
            <i className="ri-instagram-line text-xl text-pink-400"></i>
          </a>
          <a
            target="_blank"
            href={`https://www.x.com/${info.externalid.twitter_id}`}
            className="w-12 h-12 flex items-center justify-center bg-gray-800/50 rounded-full backdrop-blur-sm border border-gray-600/30 transition-all duration-300 hover:scale-110 hover:bg-gray-600/20 hover:border-gray-400/50 hover:shadow-lg hover:shadow-gray-400/20"
          >
            <i className="ri-twitter-x-line text-xl text-white"></i>
          </a>
        </div>

        {/* Actor Information */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4 text-center">Information</h2>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center justify-center gap-3 px-4 py-3 bg-purple-600/20 rounded-lg border border-purple-400/30 backdrop-blur-sm">
              <i className="ri-star-line text-purple-400 text-lg"></i>
              <div className="text-center">
                <p className="text-purple-400 text-sm font-medium">Known for</p>
                <p className="text-white">{info.detail.known_for_department}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 px-4 py-3 bg-blue-600/20 rounded-lg border border-blue-400/30 backdrop-blur-sm">
              <i className="ri-user-line text-blue-400 text-lg"></i>
              <div className="text-center">
                <p className="text-blue-400 text-sm font-medium">Gender</p>
                <p className="text-white">{info.detail.gender === 2 ? "Male" : "Female"}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 px-4 py-3 bg-green-600/20 rounded-lg border border-green-400/30 backdrop-blur-sm">
              <i className="ri-calendar-line text-green-400 text-lg"></i>
              <div className="text-center">
                <p className="text-green-400 text-sm font-medium">Date of Birth</p>
                <p className="text-white">{info.detail.birthday}</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 px-4 py-3 bg-yellow-600/20 rounded-lg border border-yellow-400/30 backdrop-blur-sm">
              <i className="ri-map-pin-line text-yellow-400 text-lg"></i>
              <div className="text-center">
                <p className="text-yellow-400 text-sm font-medium">Place of Birth</p>
                <p className="text-white text-sm">{info.detail.place_of_birth}</p>
              </div>
            </div>

            {info.detail.deathday && (
              <div className="flex items-center justify-center gap-3 px-4 py-3 bg-red-600/20 rounded-lg border border-red-400/30 backdrop-blur-sm">
                <i className="ri-calendar-2-line text-red-400 text-lg"></i>
                <div className="text-center">
                  <p className="text-red-400 text-sm font-medium">Date of Death</p>
                  <p className="text-white">{info.detail.deathday}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Biography */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-center text-white">Biography</h2>
          <div className="p-6 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10">
            <p className="text-zinc-300 leading-relaxed text-center">
              {info.detail.biography}
            </p>
          </div>
        </div>

        {/* Movies and Shows */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center text-white">Movies and Shows</h2>
          <HorizontalCards data={info.combinedCredits.cast} />
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Persondetails;