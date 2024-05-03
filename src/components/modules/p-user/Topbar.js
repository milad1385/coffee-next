"use client";
import styles from "./topbar.module.css";
import { IoIosSearch } from "react-icons/io";
import Notification from "./Notification";
import { getShow, getUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { FaBars } from "react-icons/fa6";
import Overlay from "../Overlay/Overlay";
const Topbar = () => {
  const path = usePathname();
  const router = useRouter();
  const user = getUser();
  const { isShow, setIsShow } = getShow();
  useEffect(() => {
    router.refresh();
  }, [path]);

  const showMenuHandler = () => setIsShow(true);
  return (
    <>
      <div className={styles.topbar}>
        <div className={styles.profile}>
          <div>
            <p>{user?.name ?? "کاربر کافی گلدن"}</p>
            <span>{user.role === "ADMIN" ? "ادمین" : "کاربر"}</span>
          </div>
          <img
            src={`${user?.image ?? "http://localhost:3000/uploads/user.png"}`}
            alt=""
          />
          <FaBars onClick={showMenuHandler} className={styles.icon_bar} />
        </div>
        <section>
          <div className={styles.searchBox}>
            <input type="text" placeholder="جستجو کنید" />
            <div>
              <IoIosSearch />
            </div>
          </div>
          <Notification />
        </section>
      </div>

      <Overlay isShow={isShow} onShow={setIsShow} key={crypto.randomUUID()} />
    </>
  );
};

export default Topbar;
