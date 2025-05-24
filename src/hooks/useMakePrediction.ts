import { useMutation } from "@tanstack/react-query";
import type { Abi, Hex } from "viem";
import { waitForTransactionReceipt, writeContract } from "viem/actions";
import { useWalletClient } from "wagmi";
import { isEmpty, isNil } from "lodash";

import { ERC20_ABI, HYPESWIPE_ABI } from "@/constants";

export const useMakePrediction = () => {
  const { data: walletClient } = useWalletClient();

  return useMutation({
    mutationFn: async ({
      challengeId,
      predictions,
      entryFee,
    }: {
      challengeId: number;
      predictions: boolean[];
      entryFee: bigint;
    }) => {
      if (!walletClient) throw new Error("No wallet client");
      if (isNil(challengeId) || isEmpty(predictions)) {
        throw new Error("Invalid challengeId or empty predictions");
      }

      const approval = await writeContract(walletClient, {
        address: import.meta.env.VITE_ARENA_TOKEN_CONTRACT as Hex,
        abi: ERC20_ABI as Abi,
        functionName: "approve",
        args: [import.meta.env.VITE_HYPESWIPE_CONTRACT as Hex, entryFee],
      });

      if (isNil(approval)) {
        throw new Error("Approval failed.");
      }

      const hash = await writeContract(walletClient, {
        address: import.meta.env.VITE_HYPESWIPE_CONTRACT as Hex,
        abi: HYPESWIPE_ABI as Abi,
        functionName: "makePrediction",
        args: [challengeId, predictions],
      });

      const txnReceipt = await waitForTransactionReceipt(walletClient, {
        hash,
      });

      if (txnReceipt?.status !== "success") {
        throw new Error("MakePrediction failed for some reason.");
      }

      return {
        status: "success",
        action: "makePrediction",
        txnReceipt,
        approval,
        hash,
      };
    },
  });
};
