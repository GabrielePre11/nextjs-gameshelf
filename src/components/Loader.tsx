import React from "react";

export default function Loader() {
  return (
    <div className="fixed grid place-content-center left-0 top-0 w-full min-h-dvh bg-bg-secondary z-50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-loader-circle-icon lucide-loader-circle animate-spin"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </div>
  );
}
