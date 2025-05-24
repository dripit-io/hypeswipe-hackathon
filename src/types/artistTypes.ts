export interface Artist {
  id: string;
  name: string;
  country?: string;
  genre?: string;
  images: { url: string; height: number; width: number }[];
  // ...
}

export interface EnhancedArtist extends Artist {
  side?: "left" | "right";
  sideWon?: "left" | "right";
}

export interface ChallengeDetails {
  id: number;
  startTimestamp: number;
  targetDate: number;
  spotifyIds: string[];
  isResolved: boolean;
  totalPool: bigint;
  participantCount: number;
}

export interface UserInfo {
  id: string;
  twitterHandle: string;
  twitterName: string;
  twitterPicture: string;
  address: string;
  // ...
}
