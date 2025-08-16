import React from "react";

function Dropdown({ title, options, func }) {
  return (
    <div className="relative">

      <div className="relative flex items-center group">
        <div className="absolute left-3 pointer-events-none z-10">
          <svg className="w-4 h-4 text-white/70 group-hover:text-purple-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 2v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
          </svg>
        </div>
        
        <select 
          defaultValue="0" 
          onChange={func} 
          name="format" 
          id="format"
          className="
            appearance-none
            bg-black/30 
            backdrop-blur-sm 
            border 
            border-white/10 
            rounded-xl 
            pl-10
            pr-12
            py-3 
            text-white 
            font-medium
            cursor-pointer 
            outline-none
            transition-all 
            duration-300
            hover:bg-black/40
            hover:border-purple-400/50
            hover:shadow-lg
            hover:shadow-purple-400/20
            focus:bg-black/40
            focus:border-purple-400/70
            focus:shadow-lg
            focus:shadow-purple-400/30
            min-w-[180px]
            text-sm
            lg:text-base
            group
          "
        >
          <option value="0" disabled className="bg-gray-800 text-gray-400">
            {title}
          </option>
          {options.map((o, i) => (
            <option key={i} value={o} className="bg-gray-800 text-white py-2">
              {o.toUpperCase()}
            </option>
          ))}
        </select>
        
        <div className="absolute right-4 pointer-events-none">
          <svg 
            className="w-4 h-4 text-white/70 transition-colors duration-300 group-hover:text-purple-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
     
    </div>
  );
}

export default Dropdown;