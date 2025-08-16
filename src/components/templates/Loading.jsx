import loading from '/loading.gif'

function Loading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-black flex items-center justify-center z-50">
      {/* Loading Container */}
      <div className="flex flex-col items-center justify-center">
        {/* Loading Image - Responsive sizing */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 flex items-center justify-center">
          <img 
            src={loading} 
            alt="Loading..." 
            className="w-full h-full object-contain animate-spin"
          />
        </div>
        
        {/* Optional Loading Text */}
        <div className="mt-6 text-center">
          <h2 className="text-white text-lg sm:text-xl lg:text-2xl font-semibold mb-2">
            Loading
          </h2>
          <div className="flex space-x-1 justify-center">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;