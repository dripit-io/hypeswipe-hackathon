import React from "react";
import { type Abi, type Hex } from "viem";
import { readContract } from "viem/actions";
import { useAccount, useWalletClient } from "wagmi";
import { isEmpty, isNil } from "lodash";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { HYPESWIPE_ABI } from "@/constants";

interface UserPredictionResponse {
  hasClaimed: boolean;
  hasParticipated: boolean;
  isPerfect: boolean;
  predictions: boolean[];
}

export const useGetUserPrediction = (
  enabled: boolean = true,
  challengeId?: number
): UseQueryResult<UserPredictionResponse> => {
  const { address } = useAccount();
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
    enabled: !!walletClient && isNil(challengeId) && enabled,
  });

  const effectiveChallengeId = React.useMemo(
    () => challengeId ?? Number(nextChallengeId ?? 0) - 1,
    [challengeId, nextChallengeId]
  );

  return useQuery({
    queryKey: ["userPrediction", effectiveChallengeId, address],
    queryFn: async () => {
      if (!walletClient) throw new Error("No wallet client");
      if (isNil(effectiveChallengeId)) throw new Error("Invalid challengeId");
      if (isNil(address)) throw new Error("Invalid address");

      const functionName = "getUserPrediction";
      const data = (await readContract(walletClient, {
        address: import.meta.env.VITE_HYPESWIPE_CONTRACT as Hex,
        abi: HYPESWIPE_ABI as Abi,
        functionName,
        args: [effectiveChallengeId, address],
      })) as Array<unknown>;

      if (
        isEmpty(data) ||
        data?.length !==
          HYPESWIPE_ABI.find(
            (f) => f.type === "function" && f.name === functionName
          )?.outputs?.length
      ) {
        throw new Error("Invalid challenge details");
      }

      const output = HYPESWIPE_ABI.find(
        (f) => f.type === "function" && f.name === functionName
      )?.outputs?.reduce(
        (obj, item, index) => ({
          ...obj,
          [item.name]: item.type.includes("uint")
            ? Number(data[index])
            : data[index],
        }),
        {}
      );

      return output as UserPredictionResponse;
    },
    enabled:
      !!walletClient && effectiveChallengeId >= 0 && !isNil(address) && enabled,
  });
};
