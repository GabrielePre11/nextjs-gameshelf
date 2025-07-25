export async function fetchTopGenres() {
  const apiKey = process.env.NEXT_PUBLIC_RAWG_API;
  const url = `https://api.rawg.io/api/genres?key=${apiKey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `There was an error fetching top genres: ${response.status}`
      );
    }

    const data = await response.json();

    const topGenres = data.results.sort(
      (a: { games_count: number }, b: { games_count: number }) =>
        b.games_count - a.games_count
    );

    return topGenres.slice(0, 5);
  } catch (error: unknown) {
    console.error("Error fetching top genres:", error);
  }
}
