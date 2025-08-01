"use client";

import Container from "@/layout/Container";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import { fetchGames } from "@/lib/fetchGames";
import { CompleteGame } from "@/types/complete_game";
import GameCard from "../GameCard";
import { GamesApiResponse } from "@/types/games_api";
import Link from "next/link";

export default function PopularGames() {
  const [popularGames, setPopularGames] = useState<CompleteGame[] | null>(null);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getPopularGames = async () => {
    try {
      setLoadingState(true);

      const data: GamesApiResponse = await fetchGames({
        page: 1,
        pageSize: 10,
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
      {/*=========== Loading State ===========*/}
      {loadingState && <Loader />}

      {!error && !loadingState && popularGames && (
        <Container className="grid">
          {/*=========== Heading ===========*/}
          <h3 className="text-2xl font-medium">Popular Games</h3>

          {/*=========== Popular Games ===========*/}
          <ul className="grid items-center gap-2 sm:gap-4 md:gap-5 grid-cols-2 md:grid-cols-5 mt-6">
            {popularGames.map((game) => (
              <li key={game.id} className="shrink-0">
                <GameCard game={game} />
              </li>
            ))}
          </ul>

          {/*=========== See All Games ===========*/}
          <Link href={"/games"} className="place-self-center">
            <button className="inline-flex items-center text-xl px-3 py-1.5 rounded-lg bg-bg border border-border mt-8 transition-colors duration-300 hover:bg-bg-secondary">
              See All Games
            </button>
          </Link>
        </Container>
      )}
    </section>
  );
}
