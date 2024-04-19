"use client";
import { getUser } from "@/context/UserContext";
import Link from "next/link";
import React from "react";
import styles from "./Nabvar.module.css";
import { IoIosArrowDown } from "react-icons/io";

function ProfileBox() {
  const user = getUser();
  return (
    <>
      {Object.keys(user).length ? (
        <div className={styles.dropdown}>
          <Link href="/p-user">
            <IoIosArrowDown className={styles.dropdown_icons} />
            {user.name} ، خوش آمدید
          </Link>
          <div className={styles.dropdown_content}>
            <Link href="/p-user/orders">سفارشات</Link>
            <Link href="/p-user/tickets">تیکت های پشتیبانی</Link>
            <Link href="/p-user/comments">کامنت‌ها</Link>
            <Link href="/p-user/wishlist">علاقه‌مندی‌ها</Link>
            <Link href="/p-user/account-details">جزئیات اکانت</Link>
          </div>
        </div>
      ) : (
        <li>
          <Link href="/login-register">ورود / عضویت</Link>
        </li>
      )}
    </>
  );
}

export default ProfileBox;
