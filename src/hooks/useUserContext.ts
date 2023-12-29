import { useContext } from "react";
import { UserContext } from "../contexts/AuthContext";

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error("useUserContext must be used within an UserContextProvider");
    }
    return context;
  };