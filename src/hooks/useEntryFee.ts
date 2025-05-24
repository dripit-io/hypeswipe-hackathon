import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type Abi, type Hex } from "viem";
import { readContract } from "viem/actions";
import { useWalletClient } from "wagmi";
import { isNil } from "lodash";

import { HYPESWIPE_ABI } from "@/constants";

export const useEntryFee = (): UseQueryResult<bigint> => {
  const { data: walletClient } = useWalletClient();

  return useQuery({
    queryKey: ["entryFee"],
    queryFn: async () => {
      if (!walletClient) throw new Error("No wallet client");

      return (await readContract(walletClient, {
        address: import.meta.env.VITE_HYPESWIPE_CONTRACT as Hex,
        abi: HYPESWIPE_ABI as Abi,
        functionName: "entryFee",
        args: [],
      })) as bigint;
    },
    enabled: !isNil(walletClient),
  });
};
