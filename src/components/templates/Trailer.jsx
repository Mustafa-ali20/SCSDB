import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Trailer() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const videos = useSelector((state) => state[category]?.info?.videos);

  // Find the best trailer
  const getTrailerVideo = () => {
    if (!videos || !Array.isArray(videos) || videos.length === 0) {
      return null;
    }

    const trailer = videos.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );

    if (trailer) return trailer;

    const teaser = videos.find(
      (video) => video.type === "Teaser" && video.site === "YouTube"
    );

    if (teaser) return teaser;

    const firstYouTube = videos.find((video) => video.site === "YouTube");
    return firstYouTube || videos[0];
  };

  const selectedVideo = getTrailerVideo();
  console.log("Selected video:", selectedVideo);

  if (!selectedVideo || !selectedVideo.key) {
    return (
      <>
        {/* Desktop Layout - UNCHANGED */}
        <div className="hidden lg:block bg-[rgba(0,0,0,.9)] absolute top-0 left-0 z-[100] w-screen h-screen">
          <div className="flex items-center justify-center h-full">
            <Link
              onClick={() => navigate(-1)}
              className="text-white text-4xl absolute top-5 right-5 hover:text-[#6656CD] hover:scale-115 transition-all duration-200"
            >
              <i className="ri-close-line"></i>
            </Link>
            <div className="text-white text-xl">No trailer available</div>
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden bg-[rgba(0,0,0,.9)] absolute top-0 left-0 z-[100] w-screen h-screen">
          <div className="flex items-center justify-center h-full p-4">
            <Link
              onClick={() => navigate(-1)}
              className="text-white text-2xl sm:text-3xl absolute top-4 right-4 hover:text-[#6656CD] hover:scale-115 transition-all duration-200 z-10 p-2"
            >
              <i className="ri-close-line"></i>
            </Link>
            <div className="text-white text-lg text-center">No trailer available</div>
          </div>
        </div>
      </>
    );
  }

  // Test with direct YouTube embed instead of ReactPlayer
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${selectedVideo.key}?autoplay=0&controls=1&rel=0`;

  return (
    <>
      {/* Desktop Layout - UNCHANGED */}
      <div className="hidden lg:block bg-[rgba(0,0,0,.9)] absolute top-0 left-0 z-[100] w-screen h-screen">
        <div className="flex items-center justify-center h-full">
          <Link
            onClick={() => navigate(-1)}
            className="text-white text-4xl absolute top-5 right-5 hover:text-[#6656CD] hover:scale-115 transition-all duration-200"
          >
            <i className="ri-close-line"></i>
          </Link>

          <div className="w-[80%] h-[80%] max-w-6xl flex flex-col items-center justify-center">
            {/* Test 1: Direct YouTube iframe */}
            <iframe
              width="1440"
              height="810"
              src={youtubeEmbedUrl}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="mb-4"
            />
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Layout - Responsive */}
      <div className="lg:hidden bg-[rgba(0,0,0,.9)] absolute top-0 left-0 z-[100] w-screen h-screen">
        <div className="flex items-center justify-center h-full p-4">
          <Link
            onClick={() => navigate(-1)}
            className="text-white text-2xl sm:text-3xl absolute top-4 right-4 hover:text-[#6656CD] hover:scale-115 transition-all duration-200 z-10 p-2"
          >
            <i className="ri-close-line"></i>
          </Link>

          {/* Responsive Video Container */}
          <div className="w-full h-full max-w-4xl flex items-center justify-center">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}> {/* 16:9 aspect ratio */}
              <iframe
                src={youtubeEmbedUrl}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Trailer;