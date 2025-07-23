import { Genre } from "./genre";

export interface GenresAPIResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Genre[];
}
