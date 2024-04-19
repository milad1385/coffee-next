"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();
function UserProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const getUserInfo = async () => {
      const res = await fetch(`http://localhost:3000/api/auth/me`);
      const userInfo = await res.json();
      setUserInfo(userInfo);
    };
    getUserInfo();
  }, []);
  return (
    <UserContext.Provider value={{ userInfo }}>{children}</UserContext.Provider>
  );
}

export const getUser = () => {
  const { userInfo } = useContext(UserContext);
  return userInfo;
};

export default UserProvider;
