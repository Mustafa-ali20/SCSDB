import { Link } from "react-router-dom";
import { useState } from "react";

function Sidenav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-[60] p-2 bg-[#6556cd] text-white rounded-md hover:bg-[#5445bc] transition-colors duration-300"
      >
        <i
          className={`text-xl ${
            isMobileMenuOpen ? "ri-close-line" : "ri-menu-line"
          }`}
        ></i>
      </button>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-[40]"
          onClick={closeMobileMenu}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-[50]
        w-[280px] lg:w-[20%] h-full 
        border-r-2 border-zinc-400 p-4 lg:p-6 
        bg-[#1c1c1c] lg:bg-transparent
        transform transition-transform duration-300 ease-in-out
        ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }
      `}
      >
        {/* Logo */}
          <div className="hidden lg:block">
            <div className="lg:hidden w-12 h-12"></div>
            <h1 className="text-xl lg:text-2xl text-white font-bold flex-1 text-center lg:text-left">
              <i className="mr-2 lg:mr-3 ri-tv-2-line text-[#6556cd]"></i>
              <span>SCSDB.</span>
            </h1>
          </div>
           <div className="relative lg:hidden">
            <div className="lg:hidden w-12 h-12"></div>
            <h1 className="text-xl absolute top-2 right-24 lg:text-2xl text-white font-bold flex-1 text-center lg:text-left">
              <i className="mr-2 lg:mr-3 ri-tv-2-line text-[#6556cd]"></i>
              <span>SCSDB.</span>
            </h1>
          </div>
          {/* Navigation */}
        <nav className="flex flex-col text-zinc-400 text-base lg:text-lg gap-1">
          <h1 className="text-white font-semibold text-lg lg:text-xl mt-6 lg:mt-10 mb-3 lg:mb-5">
            New feeds
          </h1>
          <Link
            to="/trending"
            onClick={closeMobileMenu}
            className="hover:bg-[#3d3677] hover:text-white rounded-lg p-3 lg:p-4 transition-all duration-300 flex items-center"
          >
            <i className="ri-fire-fill mr-2"></i>
            <span>Trending</span>
          </Link>
          <Link
            to="/popular"
            onClick={closeMobileMenu}
            className="hover:bg-[#3d3677] hover:text-white rounded-lg p-3 lg:p-4 transition-all duration-300 flex items-center"
          >
            <i className="ri-bard-fill mr-2"></i>
            <span>Popular</span>
          </Link>
          <Link
            to="/movie"
            onClick={closeMobileMenu}
            className="hover:bg-[#3d3677] hover:text-white rounded-lg p-3 lg:p-4 transition-all duration-300 flex items-center"
          >
            <i className="ri-film-fill mr-2"></i>
            <span>Movies</span>
          </Link>
          <Link
            to="/tv"
            onClick={closeMobileMenu}
            className="hover:bg-[#3d3677] hover:text-white rounded-lg p-3 lg:p-4 transition-all duration-300 flex items-center"
          >
            <i className="ri-tv-fill mr-2"></i>
            <span>TV Shows</span>
          </Link>
          <Link
            to="/actors"
            onClick={closeMobileMenu}
            className="hover:bg-[#3d3677] hover:text-white rounded-lg p-3 lg:p-4 mb-3 transition-all duration-300 flex items-center"
          >
            <i className="ri-team-fill mr-2"></i>
            <span>Actors</span>
          </Link>
        </nav>

        <hr className="bg-zinc-400 border-none h-[1.5px]" />

        <nav className="flex flex-col text-zinc-400 text-base lg:text-lg gap-1">
          <h1 className="text-white font-semibold text-lg lg:text-xl mt-6 lg:mt-10 mb-3 lg:mb-5">
            Website information
          </h1>
          <Link
            onClick={closeMobileMenu}
            className="hover:bg-[#3d3677] hover:text-white rounded-lg p-3 lg:p-4 transition-all duration-300 flex items-center"
          >
            <i className="ri-information-fill mr-2"></i>
            <span>About SCSDB</span>
          </Link>
          <Link
            onClick={closeMobileMenu}
            className="hover:bg-[#3d3677] hover:text-white rounded-lg p-3 lg:p-4 transition-all duration-300 flex items-center"
          >
            <i className="ri-phone-fill mr-2"></i>
            <span>Contact Us</span>
          </Link>
        </nav>
      </div>
    </>
  );
}

export default Sidenav;
