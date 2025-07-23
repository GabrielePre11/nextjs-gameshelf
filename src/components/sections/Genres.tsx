"use client";

import Container from "@/layout/Container";
import { fetchGenres } from "@/lib/fetchGenres";
import { Genre } from "@/types/genre";
import { GenresAPIResponse } from "@/types/genres_api";
import React, { useEffect, useState, useRef } from "react";
import GenreCard from "../GenreCard";
import Loader from "../Loader";

export default function Genres() {
  const [genres, setGenres] = useState<Genre[] | null>(null);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const genresScrollRef = useRef<HTMLUListElement>(null);

  const scrollLeft = () => {
    genresScrollRef.current?.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRight = () => {
    genresScrollRef.current?.scrollBy({ left: 250, behavior: "smooth" });
  };

  const getGenres = async () => {
    try {
      setLoadingState(true);

      const data: GenresAPIResponse = await fetchGenres();
      setGenres(data.results);
    } catch (error: unknown) {
      setError("Error fetching genres. Please try again later.");
      if (error instanceof Error) {
        console.error("Error fetching genres:", error.message);
      }
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    getGenres();
  }, []);

  return (
    <section className="pt-10 overflow-hidden" aria-label="Genres Section">
      <Container>
        {/*=========== Heading & Scroll Arrows ===========*/}
        <div className="flex items-center justify-between">
          {/*=========== Heading ===========*/}
          <h3 className="text-2xl font-medium">Browse All Genres</h3>

          {/*=========== Scroll Arrows ===========*/}
          <div className="flex items-center gap-3">
            {/*=========== Left Arrow ===========*/}
            <button
              className="grid place-items-center bg-bg-secondary rounded-full border border-border p-1 transition-colors duration-300 hover:bg-bg-secondary/70"
              aria-label="Scroll to left"
              onClick={scrollLeft}
            >
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
                className="lucide lucide-arrow-left-icon lucide-arrow-left"
              >
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
            </button>

            {/*=========== Right Arrow ===========*/}
            <button
              className="grid place-items-center bg-bg-secondary rounded-full border border-border p-1 transition-colors duration-300 hover:bg-bg-secondary/70"
              aria-label="Scroll to right"
              onClick={scrollRight}
            >
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
                className="lucide lucide-arrow-right-icon lucide-arrow-right"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/*=========== Loading State ===========*/}
        {loadingState && <Loader />}

        {/*=========== Categories ===========*/}
        {!error && !loadingState && genres && (
          <ul
            className="flex items-center mt-6 overflow-x-auto space-x-5 scrollbar-hidden"
            ref={genresScrollRef}
          >
            {genres?.map((genre) => (
              <li key={genre.id} className="shrink-0">
                <GenreCard genre={genre} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
