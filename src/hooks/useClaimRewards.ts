import React from "react";
import type { MutationStatus } from "@tanstack/react-query";
import type { Abi, Hex } from "viem";
import { waitForTransactionReceipt, writeContract } from "viem/actions";
import { useWalletClient } from "wagmi";

import { HYPESWIPE_ABI } from "@/constants";

export const useClaimRewards = () => {
  const { data: walletClient } = useWalletClient();

  const [status, setStatus] = React.useState<MutationStatus>("idle");
  const [data, setData] = React.useState<unknown>();
  const [error, setError] = React.useState<string | null>(null);

  const reset = () => {
    setStatus("idle");
    setData(undefined);
    setError(null);
  };

  const claimAllRewards = async () => {
    reset();
    if (!walletClient) throw new Error("No wallet client");

    setStatus("pending");
    try {
      const hash = await writeContract(walletClient, {
        address: import.meta.env.VITE_HYPESWIPE_CONTRACT as Hex,
        abi: HYPESWIPE_ABI as Abi,
        functionName: "claimAllRewards",
        args: [],
      });

      const txnReceipt = await waitForTransactionReceipt(walletClient, {
        hash,
      });
      console.log({ txnReceipt, hash });

      if (txnReceipt?.status !== "success") {
        throw new Error("ClaimAllRewards failed for some reason.");
      }

      setStatus("success");
      setData({
        status: "success",
        action: "claimAllRewards",
      });
    } catch (error) {
      console.error(error);
      setStatus("error");
      setError(error as string);
    }
  };

  return { status, data, error, claimAllRewards };
};
