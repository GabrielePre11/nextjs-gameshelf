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

  //=========== FILTERS ===========//
  const [selectedFilters, setSelectedFilters] = useState<{
    platform: string[];
    genre: string[];
    tag: string[];
    rating: string[];
  }>({
    platform: [],
    genre: [],
    tag: [],
    rating: [],
  });

  //=========== handleFilterChange (onChange) ===========//
  const handleFilterChange = useCallback(
    (type: "platform" | "genre" | "tag" | "rating", value: string) => {
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

  //=========== getRatingLabel ===========//
  /**
   * Converts a numeric game rating (from 0 to 5) into a human-readable string label.
   *
   * The RAWG API returns ratings as floating-point numbers (e.g. 4.47), and this function
   * maps those values to star-based categories for filter matching (like "4-stars", "5-stars", etc.).
   *
   * This is useful when comparing selected filters (e.g., ["4-stars", "5-stars"]) to game ratings.
   *
   * Example:
   *   getRatingLabel(4.6) => "5-stars"
   *   getRatingLabel(3.8) => "4-stars"
   *   getRatingLabel(1.2) => "1-star"
   */
  function getRatingLabel(rating: number): string {
    switch (true) {
      case rating >= 4.5:
        return "5-stars";
      case rating >= 3.5:
        return "4-stars";
      case rating >= 2.5:
        return "3-stars";
      case rating >= 1.5:
        return "2-stars";
      default:
        return "1-star";
    }
  }

  //=========== Filtered Games ===========//
  const filteredGames = games.filter((game) => {
    const matchesPlatform =
      selectedFilters.platform.length === 0 ||
      game.platforms.some((p) =>
        selectedFilters.platform.includes(p.platform.name)
      );

    const matchesGenre =
      selectedFilters.genre.length === 0 ||
      game.genres.some((g) => selectedFilters.genre.includes(g.name));

    const matchesTag =
      selectedFilters.tag.length === 0 ||
      game.tags.some((t) => selectedFilters.tag.includes(t.name));

    const matchesRating =
      selectedFilters.rating.length === 0 ||
      selectedFilters.rating.includes(getRatingLabel(game.rating));

    return matchesPlatform && matchesGenre && matchesTag && matchesRating;
  });

  const getGames = async () => {
    try {
      setLoadingState(true);

      const data: GamesApiResponse = await fetchGames("", page, 12);
      setGames((prev) => {
        const existingGames = new Set(prev.map((game) => game.id));

        const newGames = data.results.filter(
          (game) => !existingGames.has(game.id)
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

  useEffect(() => {
    getGames();
  }, [page]);

  const loadMoreGames = useCallback(() => {
    setLoadingState(true);
    setPage((prev) => prev + 1);
  }, []);

  return (
    <section aria-label="Games Section">
      {/*=========== Hero (Banner) ===========*/}
      <Hero />

      <Container>
        <div className="grid gap-5 grid-cols-1 lg:grid-cols-[250px_1fr] mt-10">
          {/*=========== Filters ===========*/}
          <Filters
            filters={selectedFilters}
            onFilterChange={handleFilterChange}
          />

          {/*=========== Loading State ===========*/}
          {loadingState && <Loader />}

          {/*=========== Games ===========*/}
          {!error && !loadingState && games && (
            <ul className="grid items-center gap-2 sm:gap-4 md:gap-5 grid-cols-2 md:grid-cols-4">
              {filteredGames.map((game) => (
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

// AGGIUSTARE FILTRI STELLE FUNZIONANO MA GLI ALTRI FILTRI NO _________________
