import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type Abi, type Hex } from "viem";
import { readContract } from "viem/actions";
import { useAccount, useWalletClient } from "wagmi";
import { isNil } from "lodash";

import { HYPESWIPE_ABI } from "@/constants";

export const useGetUserChallenges = (): UseQueryResult<string[]> => {
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();

  return useQuery({
    queryKey: ["userChallenges", address],
    queryFn: async () => {
      if (!walletClient) throw new Error("No wallet client");

      const userChallenges = (await readContract(walletClient, {
        address: import.meta.env.VITE_HYPESWIPE_CONTRACT as Hex,
        abi: HYPESWIPE_ABI as Abi,
        functionName: "getUserChallenges",
        args: [address],
      })) as string[];

      return userChallenges
        .map((challenge) => challenge.toString())
        .sort((a, b) => Number(b) - Number(a)); // Sort in descending order
    },
    enabled: !isNil(walletClient),
  });
};
