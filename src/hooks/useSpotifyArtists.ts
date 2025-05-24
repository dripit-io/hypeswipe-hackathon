import { useQuery } from "@tanstack/react-query";

interface UseSpotifyArtistsArgs {
  spotifyIds: string[];
}

export const useSpotifyArtists = ({ spotifyIds }: UseSpotifyArtistsArgs) => {
  const { data: authToken } = useQuery({
    queryKey: ["spotifyToken"],
    queryFn: async () => {
      const res = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
          client_secret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
        }),
      });
      const resolvedRes = await res.json();
      return resolvedRes.access_token;
    },
    staleTime: 10_000,
  });

  return useQuery({
    queryKey: ["spotifyArtists", spotifyIds],
    queryFn: async () => {
      if (!authToken) throw new Error("No auth token");
      if (!spotifyIds?.length) throw new Error("No spotify IDs");

      const artists = await Promise.all(
        spotifyIds.map(async (id) => {
          const response = await fetch(
            `https://api.spotify.com/v1/artists/${id}`,
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error(`Failed to fetch artist ${id}`);
          }
          return response.json();
        })
      );

      console.log({ artists });

      return artists;
    },
    enabled: !!authToken && !!spotifyIds?.length,
  });
};
