export async function fetchGameSeries(slug: string) {
  const apiKey = process.env.NEXT_PUBLIC_RAWG_API;
  const gameSeriesURL = `https://api.rawg.io/api/games/${slug}/game-series?key=${apiKey}`;

  try {
    const response = await fetch(gameSeriesURL);

    if (!response.ok) {
      throw new Error(
        `There was an error fetching more in the series game: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    console.error("Error fetching more in the series game:", error);
  }
}
