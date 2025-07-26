"use client";

import React, { useCallback } from "react";
import { fetchGenre } from "@/lib/fetchGenre";
import { useEffect, useState } from "react";
import Container from "@/layout/Container";
import Loader from "@/components/Loader";
import Image from "next/image";
import { DetailedGenreResponse } from "@/types/genre";
import { fetchGenreGames } from "@/lib/fetchGenreGames";
import { GameSeriesResponse } from "@/types/game_series_api";
import { CompleteGame } from "@/types/complete_game";
import GameCard from "@/components/GameCard";

export default function GenrePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [genre, setGenre] = useState<DetailedGenreResponse | null>(null);
  const [genreGames, setGenreGames] = useState<CompleteGame[]>([]);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const getGenre = useCallback(async () => {
    try {
      setLoadingState(true);

      const { slug } = await params;
      const data: DetailedGenreResponse = await fetchGenre(slug);
      setGenre(data);
    } catch (error: unknown) {
      setError("Error fetching games. Please try again later.");
      if (error instanceof Error) console.error("Error games:", error.message);
    } finally {
      setLoadingState(false);
    }
  }, [params]);

  const getGenreGames = useCallback(async () => {
    try {
      setLoadingState(true);

      const { slug } = await params;
      const data: GameSeriesResponse = await fetchGenreGames(slug);
      setGenreGames(data.results);
    } catch (error: unknown) {
      setError("Error fetching games. Please try again later.");
      if (error instanceof Error)
        console.error("Error fetching games:", error.message);
    } finally {
      setLoadingState(false);
    }
  }, [params]);

  useEffect(() => {
    getGenre();
    getGenreGames();
  }, [params, getGenre, getGenreGames]);

  function stripHtml(html: string) {
    return html.replace(/<[^>]+>/g, "");
  }

  return (
    <section className="pt-20" aria-label="Detailed Genre Page">
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

        {/*=========== Genre Details ===========*/}
        {!error && !loadingState && genre && (
          <>
            <div className="relative h-[400px] overflow-hidden [clip-path:polygon(0_0,100%_0,100%_85%,0_100%)] rounded-lg">
              {/*=========== Image Background ===========*/}
              <Image
                src={genre.image_background}
                alt={`${genre.name}'s Image Background`}
                width={1000}
                height={1000}
                className="w-full h-full object-cover lg:object-top brightness-60"
                loading="lazy"
              ></Image>

              {/*=========== Title ===========*/}
              <h1 className="absolute left-3 bottom-12 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold drop-shadow-2xl drop-shadow-gray-950">
                {genre.name}
              </h1>
            </div>

            {/*=========== Description & See more ===========*/}
            <div className="flex flex-col gap-1.5 mt-4 md:mt-8">
              {/*=========== Title ===========*/}
              <h3 className="text-2xl md:text-3xl">Description</h3>

              {/*=========== Description ===========*/}
              <p
                className={`text-[0.938rem] sm:text[1rem] md:text-lg text-justify text-text-muted overflow-hidden ${
                  isExpanded ? "max-h-full" : "max-h-[250px]"
                }`}
              >
                {stripHtml(genre.description)}
              </p>

              {/*=========== See more... ===========*/}
              <button
                onClick={() => setIsExpanded((prev) => !prev)}
                className="inline-flex items-center gap-1.5 text-primary w-max py-1 sm:hidden transition duration-200 ease-in"
              >
                <span>
                  {isExpanded ? (
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
                {isExpanded ? "See less..." : "See more..."}
              </button>
            </div>

            {/*=========== Games ===========*/}
            <div className="flex flex-col gap-2 mt-8">
              {/*=========== Title ===========*/}
              <h3 className="text-2xl md:text-3xl">Game of this Genre</h3>

              {/*=========== Loading State ===========*/}
              {loadingState && <Loader />}

              {/*=========== More from this series List ===========*/}
              {!error && !loadingState && genreGames && (
                <ul
                  className="grid gap-2 md:gap-3.5
                       grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-5"
                >
                  {genreGames.map((game) => (
                    <li key={game.id}>
                      <GameCard game={game} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
