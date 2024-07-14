"use client";
import { useEffect } from "react";
import styles from "../p-user/topbar.module.css";
import { IoIosSearch, IoIosNotifications } from "react-icons/io";
import { useRouter } from "next/navigation";
import MenuIcon from "./MenuIcon";
const Topbar = ({ userInfo }) => {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, []);
  return (
    <>
      <div className={styles.topbar}>
        <div className={styles.profile}>
          <div>
            <p>{userInfo.name}</p>
            <span>ادمین</span>
          </div>
          <img src={userInfo.image} alt={userInfo.image} />
          <MenuIcon />
        </div>
        <section>
          <div className={styles.searchBox}>
            <input type="text" placeholder="جستجو کنید" />
            <div>
              <IoIosSearch />
            </div>
          </div>
          <div className={styles.notification}>
            <IoIosNotifications />
            <span>2</span>
          </div>
        </section>
      </div>
    </>
  );
};

export default Topbar;
