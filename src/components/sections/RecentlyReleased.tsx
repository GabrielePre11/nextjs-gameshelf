"use client";
import Container from "@/layout/Container";
import { fetchGames } from "@/lib/fetchGames";
import { CompleteGame } from "@/types/complete_game";
import { GamesApiResponse } from "@/types/games_api";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import GameCard from "../GameCard";

export default function RecentlyReleased() {
  const [recentlyReleasedGames, setRecentlyReleasedGames] = useState<
    CompleteGame[] | null
  >(null);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getRecentlyReleasedGames = async () => {
    try {
      setLoadingState(true);

      const data: GamesApiResponse = await fetchGames({
        page: 1,
        pageSize: 10,
        filters: {},
        ordering: "-created",
      });
      setRecentlyReleasedGames(data.results);
    } catch (error: unknown) {
      setError(
        "Error fetching recently released games. Please try again later."
      );
      if (error instanceof Error) {
        console.error("Error fetching recently released games:", error.message);
      }
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    getRecentlyReleasedGames();
  }, []);

  return (
    <section className="pt-10" aria-label="Recently Released Games Section">
      {/*=========== Loading State ===========*/}
      {loadingState && <Loader />}

      {!error && !loadingState && recentlyReleasedGames && (
        <Container>
          {/*=========== Heading ===========*/}
          <h3 className="text-2xl font-medium">Recently Released</h3>

          {/*=========== Popular Games ===========*/}
          <ul className="grid items-center gap-2 sm:gap-4 md:gap-5 grid-cols-2 md:grid-cols-5 mt-6">
            {recentlyReleasedGames.map((game) => (
              <li key={game.id} className="shrink-0">
                <GameCard game={game} />
              </li>
            ))}
          </ul>
        </Container>
      )}
    </section>
  );
}
