import { useState, useEffect } from "react";

const useLocalStorage = <T>(key: string, initialValue: T | (() => T)) => {
  const [value, setValue] = useState<T>(() => {
    if (typeof window !== "undefined") {
      const jsonValue = localStorage.getItem(key);
      if (jsonValue === null || jsonValue === undefined) {
        return typeof initialValue === "function" ? (initialValue as () => T)() : initialValue;
      } else {
        return JSON.parse(jsonValue);
      }
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as [T, typeof setValue];
};

export default useLocalStorage;
