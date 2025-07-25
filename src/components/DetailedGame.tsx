"use client";

import { fetchGameSeries } from "@/lib/fetchGameSeries";
import { fetchScreenshots } from "@/lib/fetchScreenshots";
import { DetailedGameType } from "@/types/detailed_gamepage";
import { GameSeriesResponse } from "@/types/game_series_api";
import { ScreenshotType } from "@/types/screenshot";
import { ScreenshotsApiResponse } from "@/types/screenshots_api";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { CompleteGame } from "@/types/complete_game";
import Loader from "./Loader";

export default function DetailedGame({ game }: { game: DetailedGameType }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [gameScreenshots, setGameScreenshots] = useState<
    ScreenshotType[] | null
  >(null);
  const [gameSeries, setGameSeries] = useState<CompleteGame[] | null>(null);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getGameScreenshots = async () => {
    try {
      setLoadingState(true);

      const data: ScreenshotsApiResponse = await fetchScreenshots(game.slug);
      setGameScreenshots(data.results);
    } catch (error: unknown) {
      setError("Error fetching games. Please try again later.");
      if (error instanceof Error) {
        console.error("Error games:", error.message);
      }
    } finally {
      setLoadingState(false);
    }
  };

  const getMoreFromTheSeries = async () => {
    try {
      setLoadingState(true);

      const data: GameSeriesResponse = await fetchGameSeries(game.slug);
      setGameSeries(data.results);
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
    getGameScreenshots();
    getMoreFromTheSeries();
  }, []);

  return (
    <>
      <div className="relative h-[400px] overflow-hidden [clip-path:polygon(0_0,100%_0,100%_85%,0_100%)] rounded-lg">
        {/*=========== Image Background ===========*/}
        <Image
          src={game.background_image ?? game.background_image_additional}
          alt={`${game.name}'s Image Background`}
          width={1000}
          height={1000}
          className="w-full h-full object-cover lg:object-top brightness-60"
          loading="lazy"
        ></Image>

        {/*=========== Rating ===========*/}
        <h3 className="absolute inline-flex items-center gap-2 top-2 right-2 bg-bg-secondary rounded-full px-2.5 py-1 border border-border text-sm sm:text-[1rem]">
          {game.rating.toFixed(1)}

          {/*=========== Star Icon ===========*/}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="yellow"
            stroke="yellow"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-star-icon lucide-star"
          >
            <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
          </svg>
        </h3>

        {/*=========== Title ===========*/}
        <h1 className="absolute left-3 bottom-12 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold drop-shadow-2xl drop-shadow-gray-950">
          {game?.name_original}
        </h1>
      </div>

      {/*=========== Columns ===========*/}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] lg:gap-5 mt-8">
        {/*=========== LEFT COL ===========*/}
        <div className="flex flex-col gap-8">
          {/*=========== Title, Description & See more ===========*/}
          <div className="flex flex-col gap-1.5">
            {/*=========== Title ===========*/}
            <h3 className="text-2xl md:text-3xl">Description</h3>

            {/*=========== Description ===========*/}
            <p
              className={`text-[0.938rem] sm:text[1rem] md:text-lg text-justify text-text-muted overflow-hidden ${
                isExpanded ? "max-h-full" : "max-h-[250px]"
              }`}
            >
              {game.description_raw}
            </p>

            {/*=========== See more... ===========*/}
            <button
              onClick={() => setIsExpanded((prev) => !prev)}
              className="inline-flex items-center gap-1.5 text-primary w-max py-1"
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

          {/*=========== Screenshots ===========*/}
          {!error && !loadingState && gameScreenshots && (
            <div className="flex flex-col gap-1.5">
              {/*=========== Title ===========*/}
              <h3 className="text-2xl md:text-3xl">Screenshots</h3>

              {/*=========== Screenshots ===========*/}
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {gameScreenshots.map((gameScr) => (
                  <li
                    key={gameScr.id}
                    className="rounded-lg overflow-hidden border border-border"
                  >
                    <Image
                      src={gameScr.image}
                      alt={`${game.name_original}'s Screenshots`}
                      width={gameScr.width}
                      height={gameScr.height}
                      loading="lazy"
                      className="aspect-video object-cover rounded-lg transition-all duration-300 ease-in-out hover:scale-105 hover:brightness-125"
                    ></Image>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/*=========== Min. Requirements (PC) ===========*/}
          <div className="flex flex-col gap-1.5">
            {/*=========== Title ===========*/}
            <h3 className="text-2xl md:text-3xl">
              Recommended Requierements (PC)
            </h3>

            {game.platforms.map((platform) => (
              <p
                className="text-[0.938rem] sm:text[1rem] md:text-lg text-justify text-text-muted"
                key={platform.platform.id}
              >
                {platform.requirements?.recommended}
              </p>
            ))}
          </div>
        </div>

        {/*=========== RIGHT COL ===========*/}
        <div className="flex flex-col gap-8 lg:border-l-2 lg:border-border lg:pl-5">
          {/*=========== Game's Website ===========*/}
          <div className="flex flex-col gap-1.5">
            {/*=========== Title ===========*/}
            <h3 className="text-2xl md:text-3xl">Website</h3>
            <a
              href={game.website}
              target="_blank"
              className="text-text-muted underline"
            >
              {game.website}
            </a>
          </div>

          {/*=========== Tags ===========*/}
          <div className="flex flex-col gap-1.5">
            {/*=========== Title ===========*/}
            <h3 className="text-2xl md:text-3xl">Tags</h3>
            <ul className="flex items-center flex-wrap gap-2 mt-2">
              {game.tags.map((tag) => (
                <li
                  key={tag.id}
                  className="inline-flex items-center text-sm bg-bg rounded-full border border-border px-2.5 py-1 transition-colors duration-200 hover:bg-bg-secondary/40"
                >
                  {tag.slug}
                </li>
              ))}
            </ul>
          </div>

          {/*=========== Platforms ===========*/}
          <div className="flex flex-col gap-1.5">
            {/*=========== Title ===========*/}
            <h3 className="text-2xl md:text-3xl">Platforms</h3>
            <ul className="flex items-center flex-wrap gap-2 mt-2">
              {game.platforms.map(({ platform }) => (
                <li
                  key={platform.id}
                  className="inline-flex items-center text-sm bg-bg rounded-full border border-primary px-3 py-1 transition-colors duration-200 hover:bg-bg-secondary/40"
                >
                  {platform.name}
                </li>
              ))}
            </ul>
          </div>

          {/*=========== Developers ===========*/}
          <div className="flex flex-col gap-1.5">
            {/*=========== Title ===========*/}
            <h3 className="text-2xl md:text-3xl">Developers</h3>
            <ul className="flex items-center flex-wrap gap-2 mt-2">
              {game.developers.map((dev) => (
                <li
                  key={dev.id}
                  className="inline-flex items-center text-sm bg-bg rounded-full border border-primary px-3 py-1 transition-colors duration-200 hover:bg-bg-secondary/40"
                >
                  {dev.name}
                </li>
              ))}
            </ul>
          </div>

          {/*=========== Stores ===========*/}
          <div className="flex flex-col gap-1.5">
            {/*=========== Title ===========*/}
            <h3 className="text-2xl md:text-3xl">Stores</h3>
            <ul className="flex items-center flex-wrap gap-2 mt-2">
              {game.stores.map(({ store }) => (
                <li
                  key={store.id}
                  className="inline-flex items-center text-sm bg-bg rounded-full border border-primary px-3 py-1 transition-colors duration-200 hover:bg-bg-secondary/40"
                >
                  {store.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/*=========== More from this series ===========*/}
      <div className="flex flex-col gap-2 mt-8">
        {/*=========== Title ===========*/}
        <h3 className="text-2xl md:text-3xl">More from this series</h3>

        {/*=========== Loading State ===========*/}
        {loadingState && <Loader />}

        {/*=========== More from this series List ===========*/}
        {!error && !loadingState && gameSeries && (
          <ul
            className="grid gap-2 md:gap-3.5
           grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-5"
          >
            {gameSeries.map((game) => (
              <li key={game.id}>
                <GameCard game={game} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
