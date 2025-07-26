interface Rating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

interface AddedByStatus {
  yet: number;
  owned: number;
  beaten: number;
  toplay: number;
  dropped: number;
  playing: number;
}

interface Store {
  id: number;
  store: {
    id: number;
    name: string;
    slug: string;
    domain?: string;
    games_count?: number;
    image_background?: string;
  };
}

interface PlatformWrapper {
  platform: {
    id: number;
    name: string;
    slug: string;
    image?: string | null;
    year_end?: number | null;
    year_start?: number | null;
    games_count?: number;
    image_background?: string;
  };
  released_at?: string;
  requirements?: {
    minimum?: string;
    recommended?: string;
  };
}

interface ParentPlatform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

interface MetacriticPlatform {
  metascore: number;
  url: string;
  platform: {
    platform: number;
    name: string;
    slug: string;
  };
}

interface ESRBRating {
  id: number;
  name: string;
  slug: string;
}

interface Developer {
  id: number;
  name: string;
  slug: string;
  games_count?: number;
  image_background?: string;
}

interface Genre {
  id: number;
  name: string;
  slug: string;
  games_count?: number;
  image_background?: string;
}

interface Tag {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count?: number;
  image_background?: string;
}

export interface DetailedGameType {
  id: number;
  slug: string;
  name: string;
  name_original: string;
  description: string;
  description_raw: string;
  background_image: string;
  background_image_additional?: string;
  website: string;
  released: string;
  updated: string;
  playtime: number;
  rating: number;
  rating_top: number;
  ratings: Rating[];
  ratings_count: number;
  reactions?: Record<string, number>;
  added: number;
  added_by_status?: AddedByStatus;
  achievements_count?: number;
  parent_achievements_count?: number;
  additions_count?: number;
  alternative_names?: string[];
  stores: Store[];
  platforms: PlatformWrapper[];
  parent_platforms?: ParentPlatform[];
  metacritic?: number;
  metacritic_platforms?: MetacriticPlatform[];
  metacritic_url?: string;
  esrb_rating?: ESRBRating;
  developers: Developer[];
  publishers: unknown[]; // RAWG sometimes has publishers, but not always
  genres: Genre[];
  tags: Tag[];
  saturated_color?: string;
  dominant_color?: string;
  clip?: null; // RAWG sometimes has media clips; here it's null
  game_series_count?: number;
  movies_count?: number;
  screenshots_count?: number;
  reddit_url?: string;
  reddit_count?: number;
  reddit_name?: string;
  reddit_description?: string;
  reddit_logo?: string;
  twitch_count?: number;
  youtube_count?: number;
  suggestions_count?: number;
  reviews_count: number;
  reviews_text_count?: number;
  tba?: boolean;
  user_game?: unknown;
}
