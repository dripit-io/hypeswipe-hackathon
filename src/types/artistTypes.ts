export interface Artist {
  id: number;
  name: string;
  image: string;
  country?: string;
  genre?: string;
}

export interface EnhancedArtist extends Artist {
  side?: "left" | "right";
  sideWon?: "left" | "right";
}
