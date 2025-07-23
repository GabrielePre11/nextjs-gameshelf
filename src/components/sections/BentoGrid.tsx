"use client";

import Container from "@/layout/Container";
import { fetchTopGenres } from "@/lib/fetchTopGenres";
import { Genre } from "@/types/genre";
import React, { useEffect, useState } from "react";
import BentoCard from "../BentoCard";
import Loader from "../Loader";

export default function BentoGrid() {
  const [topGenres, setTopGenres] = useState<Genre[] | null>(null);
  const [loadingState, setLoadingState] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getTopGenres = async () => {
    try {
      setLoadingState(true);

      const data: Genre[] = await fetchTopGenres();
      setTopGenres(data);
    } catch (error: unknown) {
      setError("Error fetching top genres. Please try again later.");
      if (error instanceof Error) {
        console.error("Error fetching top genres:", error.message);
      }
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    getTopGenres();
  }, []);

  return (
    <section
      className="pt-10"
      id="top-5-genres"
      aria-label="Top 5 Genres BentoGrid"
    >
      <Container>
        {/*=========== Heading ===========*/}
        <h3 className="text-2xl font-medium">
          Explore the Most Popular Genres
        </h3>

        {/*=========== Loading State ===========*/}
        {loadingState && <Loader />}

        {/*=========== BentoGrid ===========*/}
        {!error && !loadingState && topGenres && (
          <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-7 md:grid-rows-2 mt-6">
            {topGenres?.map((topGenre) => (
              <BentoCard key={topGenre.id} topGenre={topGenre} />
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
