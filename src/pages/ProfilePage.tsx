import React from "react";

import {
  Header,
  RadialGradient,
  BalanceDivider,
  ConnectButton,
} from "@/components/main";
import { ChallengeCard } from "@/components/main/ChallengeCard";
import { useUserInfo } from "@/components/providers";
import { useBalance, useGetClaims, useGetUserChallenges } from "@/hooks";
import { formatBalance } from "@/lib/utils";
import { isEmpty, isNil } from "lodash";
import { useAccount, useWalletClient } from "wagmi";
import { UserIcon } from "lucide-react";

const ProfilePage: React.FC = () => {
  const { userInfo } = useUserInfo();
  const { isConnected } = useAccount();
  const { data: balance, refetch: getBalance } = useBalance();
  const { data: totalClaimableRewards, refetch: getTotalClaimableRewards } =
    useGetClaims();
  const { data: walletClient } = useWalletClient();
  const { data: userChallenges } = useGetUserChallenges();

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

  const userName = userInfo?.twitterName ?? "Anonymous Gladiator";
  const arenaProfileLink = userInfo?.twitterHandle
    ? `arena.social/${userInfo?.twitterHandle}`
    : null;
  // const winPercentage = 75;

  return (
    <>
      <RadialGradient />
      <main className="relative container mx-auto flex h-full flex-col gap-8">
        <Header variant="sub" />
        <div className="flex w-full flex-col items-center justify-center gap-2 px-6">
          <div className="relative">
            <div className="size-32 rounded-full bg-slate-600/20">
              {!isEmpty(userInfo?.twitterPicture) ? (
                <img
                  src={userInfo?.twitterPicture}
                  alt="Profile image"
                  className="size-full rounded-full"
                />
              ) : (
                <UserIcon className="absolute top-1/2 left-1/2 size-14 -translate-x-1/2 -translate-y-1/2 stroke-1 text-slate-400" />
              )}
            </div>
            {/* <div className="absolute -top-0 -right-0 flex size-10 flex-col items-center justify-center rounded-full bg-white shadow-[-4px_4px_8px_0px_rgba(0,0,0,0.25)]">
              <p className="text-xs font-bold text-black">{winPercentage}%</p>
              <p className="text-[8px] text-[#0F0915]">wins</p>
            </div> */}
          </div>
          <div className="mb-8 flex flex-col gap-[2px]">
            <h1 className="mt-4 text-center text-2xl leading-normal font-medium text-[#76E6A0]">
              {userName}
            </h1>
            <p className="text-center text-base leading-normal font-normal text-[#939196]">
              {arenaProfileLink && (
                <a
                  href={`https://${arenaProfileLink}`}
                  target="_blank"
                  rel="noreferrer">
                  {arenaProfileLink}
                </a>
              )}
            </p>
          </div>
          <BalanceDivider
            arenaBalance={formatBalance(Number(balance ?? 0))}
            claimAmount={formatBalance(Number(totalClaimableRewards ?? 0))}
          />
        </div>
        <div className="flex w-full flex-col items-start justify-center gap-4 px-6 pb-8">
          <p className="text-base font-medium">My previous games:</p>
          <div className="flex w-full flex-col gap-4">
            {userChallenges?.map((challengeId: string) => (
              <ChallengeCard key={challengeId} challengeId={challengeId} />
            ))}
          </div>
        </div>
        <div className="mb-6 flex justify-center px-4">
          <ConnectButton />
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
