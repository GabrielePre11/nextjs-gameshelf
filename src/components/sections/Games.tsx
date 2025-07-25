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
  const [games, setGames] = useState<CompleteGame[]>([]);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [page, setPage] = useState<number>(1);

  //=========== Filters ===========//
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

  const getGames = async () => {
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
  };

  // Resets Games when any filter changes
  useEffect(() => {
    setGames([]);
    setPage(1);
    setHasMorePages(true);
  }, [selectedFilters]);

  useEffect(() => {
    getGames();
  }, [page, selectedFilters]);

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
          {loadingState && <Loader />}

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
