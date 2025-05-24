import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { formatUnits, type Abi, type Hex } from "viem";
import { readContract } from "viem/actions";
import { useAccount, useWalletClient } from "wagmi";
import { isNil } from "lodash";

import { ARENA_DECIMALS, HYPESWIPE_ABI } from "@/constants";

export const useGetClaims = (): UseQueryResult<string> => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();

  return useQuery({
    queryKey: ["totalClaimableRewards", address],
    queryFn: async () => {
      if (!walletClient) throw new Error("No wallet client");
      if (isNil(address)) throw new Error("Invalid address");

      const data = await readContract(walletClient, {
        address: import.meta.env.VITE_HYPESWIPE_CONTRACT as Hex,
        abi: HYPESWIPE_ABI as Abi,
        functionName: "getTotalClaimableRewards",
        args: [address],
      });

      return formatUnits(data as bigint, ARENA_DECIMALS);
    },
    enabled: !!walletClient && !isNil(address),
  });
};
