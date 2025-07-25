import { CompleteGame } from "./complete_game";

export interface GameSeriesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CompleteGame[];
}
