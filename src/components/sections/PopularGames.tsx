"use client";

import Container from "@/layout/Container";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import { fetchGames } from "@/lib/fetchGames";
import { CompleteGame } from "@/types/complete_game";
import GameCard from "../GameCard";
import { GamesApiResponse } from "@/types/games_api";

export default function PopularGames() {
  const [popularGames, setPopularGames] = useState<CompleteGame[] | null>(null);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getPopularGames = async () => {
    try {
      setLoadingState(true);

      const data: GamesApiResponse = await fetchGames({
        page: 1,
        pageSize: 8,
        filters: {},
        ordering: "-added",
      });
      setPopularGames(data.results);
    } catch (error: unknown) {
      setError("Error fetching popular games. Please try again later.");
      if (error instanceof Error) {
        console.error("Error popular games:", error.message);
      }
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    getPopularGames();
  }, []);

  return (
    <section className="pt-10" aria-label="Popular Games Section">
      <Container>
        {/*=========== Heading ===========*/}
        <h3 className="text-2xl font-medium">Popular Games</h3>

        {/*=========== Loading State ===========*/}
        {loadingState && <Loader />}

        {/*=========== Popular Games ===========*/}
        {!error && !loadingState && popularGames && (
          <ul className="grid items-center gap-2 sm:gap-4 md:gap-5 grid-cols-2 md:grid-cols-4 mt-6">
            {popularGames.map((game) => (
              <li key={game.id} className="shrink-0">
                <GameCard game={game} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
