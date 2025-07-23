import { Genre } from "@/types/genre";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function GenreCard({ genre }: { genre: Genre }) {
  return (
    <Link href={`/genres/${genre.id}`}>
      <article className="flex flex-col cursor-pointer">
        {/*=========== Genre's Cover ===========*/}
        <figure className="rounded-tl-lg rounded-tr-lg overflow-hidden">
          <Image
            src={`${genre.image_background}`}
            alt={`${genre.name}'s Cover`}
            width={1000}
            height={1000}
            className="aspect-square object-cover max-h-[250px] max-w-[230px] rounded-tl-lg rounded-tr-lg transition duration-200 hover:scale-103 hover:brightness-110"
            loading="lazy"
          ></Image>
        </figure>

        {/*=========== Genre's Footer ===========*/}
        <div className="w-full p-2.5 bottom-0 bg-bg-secondary rounded-b-lg">
          <h3 className="text-lg md:text-xl">{genre.name}</h3>
          <span className=" text-text-muted">
            {genre.games_count} Available Games
          </span>
        </div>
      </article>
    </Link>
  );
}
