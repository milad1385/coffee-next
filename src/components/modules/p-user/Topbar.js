"use client";
import styles from "./topbar.module.css";
import { IoIosSearch } from "react-icons/io";
import Notification from "./Notification";
import { getUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
const Topbar = () => {
  const path = usePathname();
  const router = useRouter();
  const user = getUser();
  useEffect(() => {
    router.refresh();
  }, [path]);
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
    </>
  );
};

export default Topbar;
