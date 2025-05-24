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
