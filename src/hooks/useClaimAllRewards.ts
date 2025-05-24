import { useMutation } from "@tanstack/react-query";
import type { Abi, Hex } from "viem";
import { waitForTransactionReceipt, writeContract } from "viem/actions";
import { useWalletClient } from "wagmi";

import { HYPESWIPE_ABI } from "@/constants";

export const useClaimAllRewards = () => {
  const { data: walletClient } = useWalletClient();

  return useMutation({
    mutationFn: async () => {
      if (!walletClient) throw new Error("No wallet client");

      const hash = await writeContract(walletClient, {
        address: import.meta.env.VITE_HYPESWIPE_CONTRACT as Hex,
        abi: HYPESWIPE_ABI as Abi,
        functionName: "claimAllRewards",
        args: [],
      });
      const txnReceipt = await waitForTransactionReceipt(walletClient, {
        hash,
      });

      if (txnReceipt?.status !== "success") {
        throw new Error("claimAllRewards failed for some reason.");
      }

      return {
        status: "success",
        action: "claimAllRewards",
        txnReceipt,
        hash,
      };
    },
  });
};
