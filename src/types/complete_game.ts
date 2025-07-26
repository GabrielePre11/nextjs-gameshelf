export interface CompleteGame {
  id: number;
  slug: string;
  name: string;
  released: string | null;
  tba: boolean;
  background_image: string | null;
  rating: number;
  rating_top: number;
  ratings_count: number;
  metacritic: number | null;
  added: number;
  added_by_status: {
    yet: number;
    owned: number;
    beaten: number;
    toplay: number;
    dropped: number;
    playing: number;
  };
  genres: { id: number; name: string; slug: string }[];
  parent_platforms: { platform: { id: number; name: string; slug: string } }[];
  platforms: { platform: { id: number; name: string; slug: string } }[];
  esrb_rating: { id: number; name: string; slug: string } | null;
  playtime: number;
  reviews_count: number;
  reviews_text_count: number;
  saturated_color: string;
  short_screenshots: { id: number; image: string }[];
  tags: { id: number; name: string; slug: string }[];
  stores: { store: { id: number; name: string; slug: string } }[];
  suggestions_count: number;
  updated: string;
  user_game: unknown | null;
  clip: unknown | null;
  nofollow: boolean;
  nofollow_collections: string[];
  noindex: boolean;
}
