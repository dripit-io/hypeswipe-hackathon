import React from "react";
import { type Abi, type Hex } from "viem";
import { readContract } from "viem/actions";
import { useWalletClient } from "wagmi";
import { isEmpty, isNil } from "lodash";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { HYPESWIPE_ABI } from "@/constants";
import type { ChallengeDetails } from "@/types/artistTypes";

export const useGetChallenge = (): UseQueryResult<ChallengeDetails> => {
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
    queryKey: ["challengeDetails", challengeId],
    queryFn: async () => {
      if (!walletClient) throw new Error("No wallet client");
      if (isNil(challengeId)) throw new Error("Invalid challengeId");

      const data = (await readContract(walletClient, {
        address: import.meta.env.VITE_HYPESWIPE_CONTRACT as Hex,
        abi: HYPESWIPE_ABI as Abi,
        functionName: "getChallengeDetails",
        args: [challengeId],
      })) as Array<unknown>;

      if (
        isEmpty(data) ||
        data?.length !==
          HYPESWIPE_ABI.find(
            (f) => f.type === "function" && f.name === "getChallengeDetails"
          )?.outputs?.length
      ) {
        throw new Error("Invalid challenge details");
      }

      const output = HYPESWIPE_ABI.find(
        (f) => f.type === "function" && f.name === "getChallengeDetails"
      )?.outputs?.reduce(
        (obj, item, index) => ({
          ...obj,
          [item.name]: item.type.includes("uint")
            ? Number(data[index])
            : data[index],
        }),
        {}
      );

      return output as ChallengeDetails;
    },
    enabled: !!walletClient && challengeId >= 0,
  });
};
