import { Genre } from "@/types/genre";
import Image from "next/image";
import React from "react";

export default function BentoCard({ topGenre }: { topGenre: Genre }) {
  return (
    <li className="relative md:first:col-span-3 md:nth-[2]:col-span-2 md:nth-[3]:col-span-2 md:nth-[3]:row-span-2 md:nth-[4]:col-span-2 md:nth-[5]:col-span-3 cursor-pointer transition rounded-lg border border-border overflow-hidden">
      <Image
        src={`${topGenre.image_background}`}
        alt={`${topGenre.name}'s Poster`}
        width={1000}
        height={1000}
        className="relative w-full h-full rounded-lg object-cover transition duration-200 ease-in hover:brightness-110 hover:scale-105"
      ></Image>

      <h3 className="absolute left-0 bottom-0 w-full text-xl bg-bg-secondary p-2 rounded-b-lg">
        {topGenre.name}
      </h3>
    </li>
  );
}
