export async function fetchScreenshots(slug: string) {
  const apiKey = process.env.NEXT_PUBLIC_RAWG_API;
  const gameScrenshotsURL = `https://api.rawg.io/api/games/${slug}/screenshots?key=${apiKey}`;

  try {
    const response = await fetch(gameScrenshotsURL);

    if (!response.ok) {
      throw new Error(
        `There was an error fetching screenshots: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    console.error("Error fetching screenshots:", error);
  }
}
