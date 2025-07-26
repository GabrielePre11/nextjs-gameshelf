import Loader from "@/components/Loader";
import SearchGames from "@/components/SearchGames";
import React, { Suspense } from "react";

export default function SearchPage() {
  return (
    <Suspense fallback={<Loader />}>
      <SearchGames />
    </Suspense>
  );
}
