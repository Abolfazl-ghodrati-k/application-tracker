import { useContext } from "react";
import { ApplicationContext } from "../contexts/ApplicationContext";

export const useApplicationContext = () => {
    const context = useContext(ApplicationContext);
    if (!context) {
      throw new Error("useApplicationContext must be used within an ApplicationContextProvider");
    }
    return context;
  };