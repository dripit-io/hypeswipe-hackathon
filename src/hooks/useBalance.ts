import { useQuery } from "@tanstack/react-query";
import { formatUnits, type Abi, type Hex } from "viem";
import { readContract } from "viem/actions";
import { useAccount, useWalletClient } from "wagmi";
import { isNil } from "lodash";

import { ARENA_DECIMALS, ERC20_ABI } from "@/constants";

export const useBalance = () => {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();

  return useQuery({
    queryKey: ["balance", address],
    queryFn: async () => {
      if (!walletClient) throw new Error("No wallet client");
      if (isNil(address)) throw new Error("Invalid address");

      const balance = await readContract(walletClient, {
        address: import.meta.env.VITE_ARENA_TOKEN_CONTRACT as Hex,
        abi: ERC20_ABI as Abi,
        functionName: "balanceOf",
        args: [address],
      });

      return formatUnits(balance as bigint, ARENA_DECIMALS);
    },
    enabled: !!walletClient && !isNil(address),
  });
};
