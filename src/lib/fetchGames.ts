export async function fetchGames(
  additionalQuery?: string,
  page?: number,
  pageSize?: number
) {
  const apiKey = process.env.NEXT_PUBLIC_RAWG_API;

  const queryString = `${additionalQuery}${page ? `&page=${page}` : ""}${
    pageSize ? `&page_size=${pageSize}` : ""
  }`;
  const url = `https://api.rawg.io/api/games?${queryString}&key=${apiKey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`There was an error fetching games: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    console.error("Error fetching games:", error);
  }
}
