import React, { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { User } from "@supabase/supabase-js";

interface UserContextProps {
  children: React.ReactNode;
}

interface UserContextInterface {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

export const UserContext = createContext<UserContextInterface | undefined>(
  undefined
);

export const UserContextProvider: React.FC<UserContextProps> = ({
  children,
}) => {
  const [user, setUser] = useLocalStorage<User>("user", {} as User);

  const contextValue: UserContextInterface = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
