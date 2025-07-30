import BentoGrid from "@/components/sections/BentoGrid";
import Genres from "@/components/sections/Genres";
import Hero from "@/components/sections/Hero";
import PopularGames from "@/components/sections/PopularGames";
import RecentlyReleased from "@/components/sections/RecentlyReleased";
import React from "react";

export default function page() {
  return (
    <>
      <Hero />
      <Genres />
      <PopularGames />
      <BentoGrid />
      <RecentlyReleased />
    </>
  );
}
