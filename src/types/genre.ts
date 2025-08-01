import { Game } from "./game";

export interface Genre {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
  games: Game[];
}

export interface DetailedGenreResponse {
  description: string;
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}
