import { CompleteGame } from "./complete_game";

export interface GamesApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CompleteGame[];
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  seo_h1: string;
  filters?: {
    years: Array<{
      from: number;
      to: number;
      filter: string;
      decade: number;
      years: number[];
    }>;
  };
}
