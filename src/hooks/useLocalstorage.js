"use client";
import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue) {
  const ISSERVER = typeof window === "undefined";
  const [value, setValue] = useState(() => {
    const localStorageData = !ISSERVER ? localStorage.getItem(key) : null;
    if (localStorageData?.length) {
      return JSON.parse(localStorageData);
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    if (!ISSERVER) localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
