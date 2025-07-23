import { CompleteGame } from "@/types/complete_game";
import Image from "next/image";
import React from "react";

export default function GameCard({ game }: { game: CompleteGame }) {
  return (
    <article className="flex flex-col cursor-pointer group">
      {/*=========== Game's Cover ===========*/}
      <figure className="relative rounded-tl-lg rounded-tr-lg overflow-hidden">
        <Image
          src={`${game.background_image}`}
          alt={`${game.name}'s Background Image`}
          width={1000}
          height={1000}
          loading="lazy"
          className="relative aspect-square w-full h-full object-cover rounded-tl-lg rounded-tr-lg transition duration-200 hover:scale-103 hover:brightness-110"
        ></Image>

        {/*=========== Game's Rating ===========*/}
        <h3 className="absolute inline-flex items-center gap-2 top-2 right-2 bg-bg-secondary rounded-full px-2.5 py-1 border border-border text-sm sm:text-[1rem]">
          {game.rating.toFixed(1)}

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

        {/*=========== Add to Wishlist ===========*/}
        <button
          className="absolute lg:translate-y-10 lg:group-hover:-translate-y-1 grid left-1.5 bottom-1 place-items-center p-1.5 rounded-lg bg-bg-secondary border border-border transition-all duration-300 ease-in-out"
          aria-label="Add to Wishlist"
        >
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
            className="lucide lucide-heart-icon lucide-heart"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>
      </figure>

      {/*=========== Game's Footer ===========*/}
      <div className="w-full p-2.5 bottom-0 bg-bg-secondary rounded-b-lg">
        <div className="flex flex-col gap-1">
          {/*=========== Game's Name ===========*/}
          <h3 className="text-[1rem] md:text-lg lg:text-xl truncate">
            {game.name}
          </h3>

          {/*=========== Game's Release Date ===========*/}
          <p className="inline-flex items-center gap-2 text-sm lg:text-[1rem] text-text-muted">
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
              className="lucide lucide-calendar1-icon lucide-calendar-1"
            >
              <path d="M11 14h1v4" />
              <path d="M16 2v4" />
              <path d="M3 10h18" />
              <path d="M8 2v4" />
              <rect x="3" y="4" width="18" height="18" rx="2" />
            </svg>
            {game.released}
          </p>

          {/*=========== Game's Genres/Tags ===========*/}
          <ul className="flex items-center gap-1.5 mt-2">
            {game.genres.slice(0, 2).map((genre) => (
              <li
                key={genre.id}
                className="inline-flex items-center bg-primary rounded-full px-2 py-0.5 text-bg text-sm transition-colors duration-200 hover:bg-primary-hover truncate"
              >
                {genre.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
