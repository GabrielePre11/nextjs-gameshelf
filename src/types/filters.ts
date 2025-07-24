import { OptionType } from "./filter_option";

export interface Filter {
  id: string;
  title: string;
  type: "platform" | "genre" | "tag" | "rating";
  options: OptionType[];
}
