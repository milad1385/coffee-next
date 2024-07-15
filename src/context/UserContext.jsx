"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();
function UserProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    const getUserInfo = async () => {
      const res = await fetch(`https://coffee-next-eta.vercel.app/api/auth/me`);
      const userInfo = await res.json();
      setUserInfo(userInfo);
    };
    getUserInfo();
  }, []);
  return (
    <UserContext.Provider value={{ userInfo, isShow, setIsShow }}>
      {children}
    </UserContext.Provider>
  );
}

export const getUser = () => {
  const { userInfo } = useContext(UserContext);
  return userInfo;
};

export const getShow = () => {
  const { isShow, setIsShow } = useContext(UserContext);
  return { isShow, setIsShow };
};

export default UserProvider;
