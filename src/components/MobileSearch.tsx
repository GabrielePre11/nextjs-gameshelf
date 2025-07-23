import React, { useState } from "react";

export default function MobileSearch({
  isSearchOpen,
}: {
  isSearchOpen: boolean;
}) {
  const [userQuery, setUserQuery] = useState<string>("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className={`fixed sm:hidden left-0 bg-bg-secondary w-full transform ${
        isSearchOpen ? "translate-y-14" : "-translate-y-14"
      } py-2 transition-transform duration-300 ease-in-out`}
    >
      <input
        type="text"
        inputMode="text"
        placeholder="Search games... 🕹️"
        className="relative text-lg outline-0 border-b border-zinc-400 pl-4 pr-28 py-3 w-full max-w-6xl mx-auto"
        value={userQuery}
        onChange={(e) => setUserQuery(e.target.value)}
      />

      <button
        type="button"
        className="absolute flex items-center gap-1.5 top-1/2 -translate-y-1/2 right-3 bg-bg rounded-full border border-border px-3 py-1 text-sm transition-colors duration-300 hover:bg-bg/70"
        onClick={() => setUserQuery("")}
      >
        <h3>Cancel</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-eraser-icon lucide-eraser"
        >
          <path d="M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21" />
          <path d="m5.082 11.09 8.828 8.828" />
        </svg>
      </button>
    </form>
  );
}
