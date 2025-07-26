export async function fetchSearch(userQuery: string) {
  const apiKey = process.env.NEXT_PUBLIC_RAWG_API;
  const searchQueryURL = `https://api.rawg.io/api/games?search=${encodeURIComponent(
    userQuery
  )}&key=${apiKey}`;

  try {
    const response = await fetch(searchQueryURL);

    if (!response.ok) {
      throw new Error(`There was an error fetching games: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    console.error("Error fetching games:", error);
  }
}
