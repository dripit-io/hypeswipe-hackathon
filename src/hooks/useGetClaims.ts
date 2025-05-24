import { useQuery } from "@tanstack/react-query";
import { type Abi, type Hex } from "viem";
import { readContract } from "viem/actions";
import { useAccount, useWalletClient } from "wagmi";
import { isNil } from "lodash";

import { HYPESWIPE_ABI } from "@/constants";

export const useGetClaims = () => {
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

      return data;
    },
    enabled: !!walletClient && !isNil(address),
  });
};
