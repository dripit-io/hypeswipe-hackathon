import React from "react";
import { useNavigate } from "react-router-dom";
import { UserIcon, ArrowLeftIcon, TrophyIcon } from "lucide-react";
import { useAccount, useWalletClient } from "wagmi";
import { useBalance, useGetClaims } from "@/hooks";
import { isEmpty, isNil } from "lodash";
import { cn, formatBalance } from "@/lib";
import { useUserInfo } from "@/components/providers";

interface HeaderProps {
  variant?: "main" | "sub";
  battleId?: number;
}

export const Header: React.FC<HeaderProps> = ({
  variant = "main",
  battleId = 1,
}) => {
  const navigate = useNavigate();
  const { isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const { data: balance, refetch: getBalance } = useBalance();
  const { data: totalClaimableRewards, refetch: getTotalClaimableRewards } =
    useGetClaims();
  const { userInfo } = useUserInfo();

  const fetchBalances = React.useCallback(async () => {
    try {
      await getBalance();
      await getTotalClaimableRewards();
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  }, [getBalance, getTotalClaimableRewards]);

  React.useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isConnected && !isNil(walletClient)) {
      fetchBalances();
      intervalId = setInterval(fetchBalances, 7000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isConnected, walletClient, fetchBalances]);

  return (
    <nav className="flex h-24 w-full items-center justify-between p-6 pb-4">
      {variant === "main" && (
        <>
          <p className="flex-grow truncate overflow-hidden text-lg font-bold">
            Battle #{battleId}
          </p>
          <div
            className="flex cursor-pointer items-center justify-end gap-2"
            onClick={() => navigate("/profile")}>
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-end gap-1.5">
                <img
                  src="/assets/arena-logo.png"
                  alt="arena logo"
                  className="size-4"
                />
                <p className="text-xs">{formatBalance(Number(balance ?? 0))}</p>
              </div>
              <div className="flex items-center justify-end gap-1 text-slate-500/80">
                <p className="text-[10px] font-semibold">
                  {formatBalance(Number(totalClaimableRewards ?? 0))}
                </p>
                <TrophyIcon className="size-3" />
              </div>
            </div>
            <div
              className={cn(
                "size-12 overflow-hidden rounded-full bg-slate-600/20",
                "flex items-center justify-center"
              )}>
              {!isEmpty(userInfo?.twitterPicture) ? (
                <img
                  src={userInfo?.twitterPicture}
                  alt={userInfo?.twitterName ?? "user"}
                  className="size-full object-cover"
                />
              ) : (
                <UserIcon className="size-6 stroke-1 text-slate-400" />
              )}
            </div>
          </div>
        </>
      )}
      {variant === "sub" && (
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeftIcon className="size-5" />
          </button>
          <p className="text-xl font-bold">My Profile</p>
        </div>
      )}
    </nav>
  );
};
