import type { UserInfo } from "@/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { isNil } from "lodash";

const generateHmac = async (message: string, key: string): Promise<string> => {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(key);
  const messageData = encoder.encode(message);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", cryptoKey, messageData);
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
};

export const useGetUserInfo = (): UseQueryResult<UserInfo | null> => {
  const { address } = useAccount();

  return useQuery({
    queryKey: ["userInfo", address],
    queryFn: async () => {
      if (isNil(address)) throw new Error("Invalid address");

      const timestamp = Math.floor(Date.now() / 1000).toString();
      const signature = await generateHmac(
        timestamp,
        import.meta.env.VITE_ARENA_SALT ?? ""
      );

      const response = await fetch(
        `https://api.starsarena.com/user/address?address=${address}`,
        {
          headers: {
            "x-timestamp": timestamp,
            "x-signature": signature,
          },
        }
      );
      const resolvedResponse = await response.json();
      return (resolvedResponse?.user as UserInfo) ?? null;
    },
    enabled: !isNil(address),
  });
};
