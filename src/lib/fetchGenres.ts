export async function fetchGenres() {
  const apiKey = process.env.NEXT_PUBLIC_RAWG_API;
  const genresURL = `https://api.rawg.io/api/genres?key=${apiKey}`;

  try {
    const response = await fetch(genresURL);

    if (!response.ok) {
      throw new Error(`There was an error fetching genres: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    console.error("Error fetching genres:", error);
  }
}
