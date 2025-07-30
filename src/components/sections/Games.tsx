"use client";

import Container from "@/layout/Container";
import React, { useCallback, useEffect, useState } from "react";
import Hero from "./Hero";
import { CompleteGame } from "@/types/complete_game";
import { fetchGames } from "@/lib/fetchGames";
import GameCard from "../GameCard";
import Loader from "../Loader";
import { GamesApiResponse } from "@/types/games_api";
import Filters from "../Filters";

export default function Games() {
  // List of games to display
  const [games, setGames] = useState<CompleteGame[]>([]);

  // State for showing loading spinner
  const [loadingState, setLoadingState] = useState<boolean>(false);

  // State for error messages
  const [error, setError] = useState<string | null>(null);

  // Indicates whether there are more pages to load
  const [hasMorePages, setHasMorePages] = useState(true);

  // Current pagination page
  const [page, setPage] = useState<number>(1);

  // Filters selected by the user
  const [selectedFilters, setSelectedFilters] = useState<{
    platform: string[];
    genre: string[];
    tag: string[];
  }>({
    platform: [],
    genre: [],
    tag: [],
  });

  //=========== handleFilterChange (onChange) ===========//
  const handleFilterChange = useCallback(
    (type: "platform" | "genre" | "tag", value: string) => {
      setSelectedFilters((prev) => {
        const alreadySelected = prev[type].includes(value);

        return {
          ...prev,
          [type]: alreadySelected
            ? prev[type].filter((val) => val !== value)
            : [...prev[type], value],
        };
      });
    },
    []
  );

  const getGames = useCallback(async () => {
    try {
      setLoadingState(true);

      const data: GamesApiResponse = await fetchGames({
        page,
        pageSize: 12,
        filters: {
          platform: selectedFilters.platform,
          genre: selectedFilters.genre,
          tag: selectedFilters.tag,
        },
      });

      setGames((prev) => {
        // Avoid duplicates by checking existing game IDs
        const existingGames = new Set(prev.map((game) => game.id));

        const newGames = data.results.filter(
          (game: CompleteGame) => !existingGames.has(game.id)
        );

        if (!data.next) setHasMorePages(false);
        return [...prev, ...newGames];
      });
    } catch (error: unknown) {
      setError("Error fetching games. Please try again later.");
      if (error instanceof Error) {
        console.error("Error games:", error.message);
      }
    } finally {
      setLoadingState(false);
    }
  }, [page, selectedFilters]);

  // Reset games and page number whenever the filters change
  useEffect(() => {
    setGames([]);
    setPage(1);
    setHasMorePages(true);
  }, [selectedFilters]);

  // Fetch games when page number or filters change
  useEffect(() => {
    getGames();
  }, [page, selectedFilters, getGames]);

  // Load more games (pagination)
  const loadMoreGames = useCallback(() => {
    setLoadingState(true);
    setPage((prev) => prev + 1);
  }, []);

  return (
    <section aria-label="Games Section">
      {/*=========== Hero (Banner) ===========*/}
      <Hero />

      <Container>
        <div className="grid gap-5 grid-cols-1 md:grid-cols-[210px_1fr]  lg:grid-cols-[250px_1fr] mt-10">
          {/*=========== Filters ===========*/}
          <Filters
            filters={selectedFilters}
            onFilterChange={handleFilterChange}
          />

          {/*========= Error State =========*/}
          {error && (
            <div className="grid place-items-center mt-20">
              <h2 className="text-2xl font-semibold text-red-600">{error}</h2>
              <p className="text-gray-500 mt-2">
                Please try again later or contact support.
              </p>
            </div>
          )}

          {/*=========== Loading State ===========*/}
          {loadingState && (
            <div className="grid place-items-center mt-20">
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
          )}

          {/*========= No Games Found =========*/}
          {!error && !loadingState && games.length < 1 && (
            <div className="grid place-items-center mt-20">
              <p className="text-gray-500 mt-2">No games were found.</p>
            </div>
          )}

          {/*=========== Games ===========*/}
          {!error && !loadingState && games && (
            <ul className="grid items-center gap-2 sm:gap-4 md:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {games.map((game) => (
                <li key={game.id} className="shrink-0">
                  <GameCard game={game} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/*=========== Load More Games ===========*/}
        {hasMorePages && !loadingState && (
          <div className="grid place-items-center">
            <button
              className="inline-flex items-center text-xl px-3 py-1.5 rounded-lg bg-bg border border-border mt-8 transition-colors duration-300 hover:bg-bg-secondary"
              onClick={loadMoreGames}
              disabled={loadingState}
            >
              Load More
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
