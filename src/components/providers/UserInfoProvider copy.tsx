import React from "react";

import type { UserInfo } from "@/types";
import { useGetUserInfo } from "@/hooks";

interface UserContextType {
  userInfo: UserInfo | null;
}

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export const UserInfoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: userInfo } = useGetUserInfo();

  return (
    <UserContext.Provider value={{ userInfo: userInfo ?? null }}>
      {/* value={{ userInfo: mockUserInfo }}> */}
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserInfo = () => {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserInfo must be used within UserInfoProvider");
  }
  return context;
};

// export const mockUserInfo = {
//   id: "f9a6f148-b2bb-4b06-9d9c-95d52dec275d",
//   createdOn: "2023-09-27T18:43:16.616Z",
//   twitterId: "1774014373",
//   twitterHandle: "gfk_acid",
//   twitterName: "Acid🔺",
//   twitterPicture:
//     "https://static.starsarena.com/uploads/0940899a-8a00-3f35-7522-85a5e179ff191713995340216.png",
//   lastLoginTwitterPicture:
//     "https://pbs.twimg.com/profile_images/1775604519440674816/YxCSj9At.jpg",
//   bannerUrl: null,
//   address: "0x0f738e7c7b9db9ffe95eae6c1b676dcbbde05133",
//   addressBeforeDynamicMigration: "0xec179098ee897253995431a3dedd219c554d13a9",
//   dynamicAddress: "0x0f738e7C7B9dB9FFE95EAe6C1B676dCBBDE05133",
//   ethereumAddress: "0xc57b1f6d9b66d528af1cd2d0a7a2ffa389cd3a10",
//   solanaAddress: null,
//   prevAddress: "0x68b8264c0830ef6c8e04282336b554a5aeb4bc19",
//   addressConfirmed: false,
//   twitterDescription:
//     'building <a class="thread-tag" href="/dripit_io" >@dripit_io</a><br/>Avalanche GR https://t.co/JmPlh2mWMb',
//   signedUp: false,
//   subscriptionCurrency: "'AVAX'::character varying",
//   subscriptionCurrencyAddress: null,
//   ranking: 0,
//   subscriptionPrice: "0",
//   keyPrice: "408000000000000000",
//   lastKeyPrice: "360000000000000000",
//   threadCount: 143,
//   followerCount: 373,
//   followingsCount: 100,
//   twitterFollowers: 1259,
//   subscriptionsEnabled: false,
//   userConfirmed: true,
//   twitterConfirmed: false,
//   flag: 0,
//   ixHandle: "gfk_acid",
//   handle: null,
// };
