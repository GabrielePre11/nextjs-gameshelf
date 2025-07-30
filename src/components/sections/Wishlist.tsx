"use client";

import Container from "@/layout/Container";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import GameCard from "../GameCard";
import Image from "next/image";
import { SignUpButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Wishlist() {
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (!isSignedIn) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSignedIn]);

  return (
    <section className="pt-20" aria-label="Wishlist">
      <Container>
        {!isSignedIn && (
          <div
            className="fixed grid place-items-center min-h-dvh inset-0 bg-black/50 backdrop-blur-sm z-40"
            aria-label="Access Required Modal"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed flex flex-col gap-2 text-center border-2 border-border rounded-lg z-50 p-4 sm:p-8 bg-bg-secondary">
              {/*=========== Title & Homepage ===========*/}
              <div className="flex items-center justify-between gap-2 sm:gap-5">
                <h2 className="text-xl sm:text-3xl">Access required!</h2>

                {/*=========== Go Back To Homepage ===========*/}
                <Link
                  href={"/"}
                  className="flex items-center gap-1 bg-bg px-3 py-1 rounded-lg border border-border transition-colors duration-300 hover:bg-bg/50"
                  onClick={() => {
                    document.body.style.overflow = "auto";
                  }}
                >
                  <span className="text-sm">Go Back To</span>
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
                    className="lucide lucide-house-icon lucide-house"
                  >
                    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                    <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  </svg>
                </Link>
              </div>

              {/*=========== Message ===========*/}
              <p className="text-text-muted sm:text-lg">
                You must be signed in to see this page!
              </p>

              {/*=========== Image ===========*/}
              <Image
                src={"/login.svg"}
                alt="Sign Up"
                width={100}
                height={100}
                className="size-56 place-self-center drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]"
              ></Image>

              {/*=========== Sign Up Button ===========*/}
              <div
                className="flex items-center justify-center place-self-center gap-2 w-full px-5 py-2 sm:py-3 sm:text-lg bg-bg border border-border rounded-lg transition-colors duration-300 hover:bg-bg/50 cursor-pointer"
                aria-label="Sign Up"
              >
                <SignUpButton mode="modal" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-log-in-icon lucide-log-in"
                >
                  <path d="m10 17 5-5-5-5" />
                  <path d="M15 12H3" />
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </Container>

      <Container>
        {/*========== Title ==========*/}
        <h2 className="text-2xl flex items-center gap-2">
          Your Wishlist:
          <span className="text-3xl text-primary">{favorites.length}</span>
        </h2>

        {/* No Favorites */}
        {favorites.length === 0 && (
          <figure className="grid place-items-center my-10">
            <Image
              src={"/empty.svg"}
              alt="No Games added in Wishlist"
              width={500}
              height={500}
            ></Image>

            <p className="sm:text-lg text-center text-text-muted pt-5">
              No games added to Wishlist yet!
            </p>
          </figure>
        )}

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
