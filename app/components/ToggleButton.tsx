"use client";

import { useFiles } from "../context/FileContext";
import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

export default function ToggleButton() {
  const { showAuth, toggleAuth } = useFiles();
  const [isHovered, setIsHovered] = useState(false);
  const debouncedHover = useDebounce(isHovered, 150);

  return (
    <div className="relative">
      <button
        onClick={toggleAuth}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-white border border-gray-200 rounded-full shadow-md hover:shadow-lg flex items-center justify-center w-10 h-10"
      >
        {showAuth ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        )}
      </button>
      {debouncedHover && (
        <div className="absolute top-1/2 -translate-y-1/2 -right-2 -translate-x-full px-2 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap">
          {showAuth ? "Hide" : "Sign In"}
        </div>
      )}
    </div>
  );
}
