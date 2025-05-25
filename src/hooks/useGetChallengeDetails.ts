import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type Abi, type Hex } from "viem";
import { readContract } from "viem/actions";
import { useWalletClient } from "wagmi";
import { isEmpty, isNil } from "lodash";

import { HYPESWIPE_ABI } from "@/constants";
import type { ChallengeDetails } from "@/types/artistTypes";

export const useGetChallengeDetails = (
  challengeId: number
): UseQueryResult<ChallengeDetails> => {
  const { data: walletClient } = useWalletClient();

  return useQuery({
    queryKey: ["challengeDetails", challengeId],
    queryFn: async () => {
      if (!walletClient) throw new Error("No wallet client");
      if (isNil(challengeId)) throw new Error("Invalid challengeId");

      const functionName = "getChallengeDetails";
      const data = (await readContract(walletClient, {
        address: import.meta.env.VITE_HYPESWIPE_CONTRACT as Hex,
        abi: HYPESWIPE_ABI as Abi,
        functionName,
        args: [challengeId],
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

      return output as ChallengeDetails;
    },
    enabled: !!walletClient && challengeId >= 0,
  });
};
