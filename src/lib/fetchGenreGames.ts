export async function fetchGenreGames(slug: string) {
  const apiKey = process.env.NEXT_PUBLIC_RAWG_API;
  const genreGamesURL = `https://api.rawg.io/api/games?genres=${slug}&key=${apiKey}`;

  try {
    const response = await fetch(genreGamesURL);

    if (!response.ok) {
      throw new Error(`There was an error fetching games: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    console.error("Error fetching games:", error);
  }
}
