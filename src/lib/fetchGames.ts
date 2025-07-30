// The RAWG API needs ids instead of slug or names
const PLATFORM_SLUG_TO_ID: Record<string, number> = {
  pc: 4,
  ps5: 187,
  "xbox-one": 1,
  ps4: 18,
  "xbox-series-x": 186,
  switch: 7,
  ios: 3,
  android: 21,
};

type FilterOptions = Partial<{
  platform: string[];
  genre: string[];
  tag: string[];
}>;

export interface FetchGameProps {
  page: number;
  pageSize: number;
  filters: FilterOptions;
  ordering?: string;
}

export async function fetchGames({
  page,
  pageSize,
  filters,
  ordering,
}: FetchGameProps) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_RAWG_API;
    const baseURL = "https://api.rawg.io/api/games";
    const params = new URLSearchParams();

    params.set("page", String(page));
    params.set("page_size", String(pageSize));
    params.set("key", apiKey!);

    //========= Filters =========//
    if (filters.platform?.length) {
      const platformsIDs = filters.platform
        .map((platformName) => PLATFORM_SLUG_TO_ID[platformName])
        .filter(Boolean);
      // Boolean deletes falsy values like undefined

      if (platformsIDs.length > 0) {
        params.set("platforms", platformsIDs.join(","));
      }
    }
    if (filters.genre?.length) params.set("genres", filters.genre.join(","));
    if (filters.tag?.length) params.set("tags", filters.tag.join(","));

    // ========= Ordering =========//
    if (ordering) {
      params.set("ordering", ordering);
    }

    //========= Final URL =========//
    const url = `${baseURL}?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`There was an error fetching games: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    console.error("Error fetching games:", error);
    throw error;
  }
}
