"use client";

import DetailedGame from "@/components/DetailedGame";
import Loader from "@/components/Loader";
import Container from "@/layout/Container";
import { fetchGame } from "@/lib/fetchGame";
import { DetailedGameType } from "@/types/detailed_gamepage";
import React, { useEffect, useState } from "react";

export default function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [game, setGame] = useState<DetailedGameType | null>(null);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getGame = async () => {
      try {
        setLoadingState(true);
        const { slug } = await params;

        const data = await fetchGame(slug);
        setGame(data);
      } catch (error: unknown) {
        setError("Error fetching games. Please try again later.");
        if (error instanceof Error) {
          console.error("Error games:", error.message);
        }
      } finally {
        setLoadingState(false);
      }
    };

    getGame();
  }, [params]);

  return (
    <section className="pt-20" aria-label="Detailed Game Page">
      <Container>
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

        {/*=========== DetailedGame Component ===========*/}
        {!error && !loadingState && game && (
          <DetailedGame key={game.id} game={game} />
        )}
      </Container>
    </section>
  );
}
