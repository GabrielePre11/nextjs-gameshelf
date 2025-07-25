import { ScreenshotType } from "./screenshot";

export interface ScreenshotsApiResponse {
  count: number;
  next: null;
  previous: null;
  results: ScreenshotType[];
}
