"use client";

import Container from "@/layout/Container";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { useSearchParams } from "next/navigation";
import { fetchSearch } from "@/lib/fetchSearch";
import GameCard from "./GameCard";
import { CompleteGame } from "@/types/complete_game";
import { GameSeriesResponse } from "@/types/game_series_api";
import Image from "next/image";

export default function SearchGames() {
  const [searchedGames, setSearchedGames] = useState<CompleteGame[] | null>(
    null
  );
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();

  // Retrieve the search query from the URL parameters
  // This will be used to fetch the games based on the user's search input.
  const userQuery = searchParams.get("q");

  useEffect(() => {
    const fetchSearchedGames = async () => {
      try {
        setLoadingState(true);

        const data: GameSeriesResponse = await fetchSearch(userQuery ?? "");
        setSearchedGames(data.results);
      } catch (error: unknown) {
        setError("Error fetching games. Please try again later.");
        if (error instanceof Error) {
          console.error("Error games:", error.message);
        }
      } finally {
        setLoadingState(false);
      }
    };

    fetchSearchedGames();
  }, [userQuery]);

  return (
    <section className="pt-20" aria-label="Search Page">
      <Container>
        {/*====== Loading State... ======*/}
        {loadingState && <Loader />}

        {/*====== Error State ======*/}
        {error && (
          // If there's an error fetching the games, show an error message.
          <div className="grid place-content-center py-16">
            <p className="text-lg sm:text-2xl lg:text-3xl">
              Oops! ❌ There was an error loading games! Try again!
            </p>
          </div>
        )}

        {/*=========== Games ===========*/}
        <div className="flex flex-col gap-2">
          {/*=========== Title ===========*/}
          <h3 className="inline-flex items-center gap-2 text-2xl md:text-3xl">
            You&apos;ve searched for:{" "}
            <em className="flex text-lg md:text-xl text-primary">
              {userQuery}
            </em>
          </h3>

          {/*=========== Loading State ===========*/}
          {loadingState && <Loader />}

          {/*====== No available Favorites ====== */}
          {searchedGames?.length === 0 && (
            <div>
              <figure className="min-h-svh grid place-content-center mt-10">
                <Image
                  src={"/empty.svg"}
                  width={100}
                  height={100}
                  className="w-[300px] sm:w-[500px] lg:w-[800px]"
                  alt="No Games SVG"
                />
              </figure>
            </div>
          )}

          {/*=========== More from this series List ===========*/}
          {!error && !loadingState && searchedGames && (
            <ul
              className="grid gap-2 md:gap-3.5
                               grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-5"
            >
              {searchedGames.map((game) => (
                <li key={game.id}>
                  <GameCard game={game} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}
