"use client";
import React, { useEffect } from "react";
import { FaBars } from "react-icons/fa";
import styles from "./topbar.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { getShow } from "@/context/UserContext";
import Overlay from "../Overlay/Overlay";

function MenuIcon() {
  const path = usePathname();
  const router = useRouter();
  const { isShow, setIsShow } = getShow();

  const showMenuHandler = () => setIsShow(true);

  useEffect(() => {
    router.refresh();
  }, [path]);

  return (
    <>
      <FaBars onClick={showMenuHandler} className={styles.icon_bar} />
      <Overlay isShow={isShow} onShow={setIsShow} key={crypto.randomUUID()} />
    </>
  );
}

export default MenuIcon;
