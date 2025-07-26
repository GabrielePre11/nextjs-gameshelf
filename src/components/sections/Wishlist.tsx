"use client";

import Container from "@/layout/Container";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import GameCard from "../GameCard";

export default function Wishlist() {
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  return (
    <section className="pt-20" aria-label="Wishlist">
      <Container>
        {/*========== Title ==========*/}
        <h2 className="text-2xl flex items-center gap-2">
          Your Wishlist:{" "}
          <span className="text-3xl text-primary">{favorites.length}</span>
        </h2>

        {/*========== Wishlist ==========*/}
        {favorites && (
          <ul
            className="grid gap-2 md:gap-3.5
                                       grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mt-5"
          >
            {favorites.map((game) => (
              <li key={game.id}>
                <GameCard game={game} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
