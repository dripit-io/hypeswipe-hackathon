import React from "react";
import { type Abi, type Hex } from "viem";
import { readContract } from "viem/actions";
import { useWalletClient } from "wagmi";
import { isNil } from "lodash";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { HYPESWIPE_ABI } from "@/constants";

export const useGetChallengeOutcomes = (): UseQueryResult<boolean[]> => {
  const { data: walletClient } = useWalletClient();
  const { data: nextChallengeId } = useQuery({
    queryKey: ["nextChallengeId"],
    queryFn: async () => {
      if (!walletClient) throw new Error("No wallet client");

      return (await readContract(walletClient, {
        address: import.meta.env.VITE_HYPESWIPE_CONTRACT as Hex,
        abi: HYPESWIPE_ABI as Abi,
        functionName: "nextChallengeId",
        args: [],
      })) as bigint;
    },
    enabled: !!walletClient,
  });
  const challengeId = React.useMemo(
    () => Number(nextChallengeId ?? 0) - 1,
    [nextChallengeId]
  );

  return useQuery({
    queryKey: ["challengeOutcomes", challengeId],
    queryFn: async () => {
      if (!walletClient) throw new Error("No wallet client");
      if (isNil(challengeId)) throw new Error("Invalid challengeId");

      const functionName = "getChallengeOutcomes";

      const data = (await readContract(walletClient, {
        address: import.meta.env.VITE_HYPESWIPE_CONTRACT as Hex,
        abi: HYPESWIPE_ABI as Abi,
        functionName,
        args: [challengeId],
      })) as Array<unknown>;

      return data as boolean[];
    },
    enabled: !!walletClient && challengeId >= 0,
  });
};
