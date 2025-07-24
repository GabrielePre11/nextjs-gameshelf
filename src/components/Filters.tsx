"use client";
import { OptionType } from "@/types/filter_option";
import { Filter } from "@/types/filters";
import React, { useState } from "react";

type FiltersProps = {
  filters: {
    platform: string[];
    genre: string[];
    tag: string[];
    rating: string[];
  };
  onFilterChange: (
    type: "platform" | "genre" | "tag" | "rating",
    value: string
  ) => void;
};

export default function Filters({ filters, onFilterChange }: FiltersProps) {
  const filterConfig: Filter[] = [
    {
      id: "platforms",
      title: "Platforms",
      type: "platform",
      options: [
        { id: "pc", label: "PC" },
        { id: "ps5", label: "PlayStation 5" },
        { id: "xbox-one", label: "Xbox One" },
        { id: "ps4", label: "PlayStation 4" },
        { id: "xbox-series-x", label: "Xbox Series X/S" },
        { id: "switch", label: "Nintendo Switch" },
        { id: "ios", label: "iOS" },
        { id: "android", label: "Android" },
      ],
    },

    {
      id: "genres",
      title: "Genres",
      type: "genre",
      options: [
        { id: "action", label: "Action" },
        { id: "adventure", label: "Adventure" },
        { id: "puzzle", label: "Puzzle" },
        { id: "indie", label: "Indie" },
        { id: "platformer", label: "Platformer" },
        { id: "arcade", label: "Arcade" },
        { id: "racing", label: "Racing" },
        { id: "sports", label: "Sports" },
      ],
    },

    {
      id: "tags",
      title: "Tags",
      type: "tag",
      options: [
        { id: "singleplayer", label: "Singleplayer" },
        { id: "multiplayer", label: "Multiplayer" },
      ],
    },

    {
      id: "ratings",
      title: "Ratings",
      type: "rating",
      options: [
        { id: "5-stars", label: "5 ⭐⭐⭐⭐⭐" },
        { id: "4-stars", label: "4 ⭐⭐⭐⭐" },
        { id: "3-stars", label: "3 ⭐⭐⭐" },
        { id: "2-stars", label: "2 ⭐⭐" },
        { id: "1-star", label: "1 ⭐" },
      ],
    },
  ];

  const [isExpanded, setIsExpanded] = useState<{ [key: string]: boolean }>({});
  const maxOptionsNumber = 5;

  const toggleExpanded = (filterId: string) => {
    setIsExpanded((prev) => ({
      ...prev,
      [filterId]: !prev[filterId],
    }));
  };

  return (
    <aside className="flex flex-col place-items-start lg:border-r-2 lg:border-border">
      {/*========= Header =========*/}
      <header className="flex items-center justify-between w-full lg:pr-4.5">
        <h2 className="font-medium text-2xl">Filters</h2>

        {/*========= Close Filters =========*/}
        <button className="grid place-items-center p-1.5 bg-bg border border-border rounded-lg transition-colors duration-300 hover:bg-bg/60">
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
            className="lucide lucide-sliders-horizontal-icon lucide-sliders-horizontal"
          >
            <line x1="21" x2="14" y1="4" y2="4" />
            <line x1="10" x2="3" y1="4" y2="4" />
            <line x1="21" x2="12" y1="12" y2="12" />
            <line x1="8" x2="3" y1="12" y2="12" />
            <line x1="21" x2="16" y1="20" y2="20" />
            <line x1="12" x2="3" y1="20" y2="20" />
            <line x1="14" x2="14" y1="2" y2="6" />
            <line x1="8" x2="8" y1="10" y2="14" />
            <line x1="16" x2="16" y1="18" y2="22" />
          </svg>
        </button>
      </header>

      {/*========= Filters =========*/}
      <ul className="grid grid-cols-1 gap-4 mt-3">
        {filterConfig.map((filter) => {
          const visibleOptions = isExpanded[filter.id]
            ? filter.options
            : filter.options.slice(0, maxOptionsNumber);

          return (
            <li key={filter.id}>
              {/*========= Title =========*/}
              <h3 className="text-xl pb-2">{filter.title}</h3>

              {/*========= Checkboxes =========*/}
              {visibleOptions.map((option: OptionType) => (
                <label
                  key={option.id}
                  htmlFor={`${filter.id}_${option.id}`}
                  className="flex items-center gap-2 py-0.5 text-[1.1rem]"
                >
                  <input
                    id={`${filter.id}_${option.id}`}
                    type="checkbox"
                    className="size-4 accent-blue-500"
                    checked={filters[filter.type]?.includes(option.id)}
                    onChange={() => onFilterChange(filter.type, option.id)}
                  />
                  {option.label}
                </label>
              ))}

              {filter.options.length > maxOptionsNumber && (
                <button
                  onClick={() => toggleExpanded(filter.id)}
                  className="inline-flex items-center gap-1.5 text-primary w-max py-1"
                >
                  <span>
                    {isExpanded[filter.id] ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-circle-minus-icon lucide-circle-minus transition duration-200 ease-in hover:rotate-360"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 12h8" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-circle-plus-icon lucide-circle-plus transition duration-200 ease-in hover:rotate-360"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 12h8" />
                        <path d="M12 8v8" />
                      </svg>
                    )}
                  </span>
                  {isExpanded[filter.id] ? "See less..." : "See more..."}
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
