"use client";
import React, { useState } from "react";
import {
  FaBars,
  FaBasketShopping,
  FaMagnifyingGlass,
  FaArrowRightToBracket,
  FaXmark,
} from "react-icons/fa6";
import styles from "./MobileNav.module.css";
import Link from "next/link";
import {
  FaBook,
  FaHome,
  FaLaptop,
  FaPhone,
  FaRuler,
  FaShoppingBag,
  FaStore,
} from "react-icons/fa";
import Overlay from "../Overlay/Overlay";
import { IoMdSettings } from "react-icons/io";
import { BiSolidDashboard } from "react-icons/bi";
function MobileNav({ user }) {
  const [isShowOverlay, setIsShowOverlay] = useState(false);
  console.log(user);
  const showMenuHandler = () => {
    setIsShowOverlay(true);
  };
  return (
    <>
      <div className={styles.nav}>
        <FaBars className={styles.nav_bar} onClick={showMenuHandler} />
        <Link href="/" className={styles.logo_app}>
          <img src="/images/logo.png" alt="Logo" />
        </Link>
        <Link href="/cart" className={styles.logo_app}>
          <FaShoppingBag className={styles.nav_basket} />
        </Link>
      </div>
      <div className={`${styles.nav_menu} ${isShowOverlay ? styles.show : ""}`}>
        <section className={styles.nav_header}>
          <Link href="/" className={styles.logo_app}>
            <img src="/images/logo.png" alt="Logo" />
          </Link>
          <FaXmark onClick={() => setIsShowOverlay(false)} />
        </section>
        <main className={styles.nav_main}>
          <div className={styles.search_bar}>
            <button>
              <FaMagnifyingGlass />
            </button>
            <input type="text" placeholder="جستجو کنید " />
          </div>
          <ul className={styles.links}>
            <li className={styles.home}>
              <FaHome />
              <Link href="/">صفحه اصلی</Link>
            </li>
            <li>
              <FaStore />
              <Link href="/category">فروشگاه</Link>
            </li>
            <li>
              <FaBook />
              <Link href="/blog">وبلاگ</Link>
            </li>
            <li>
              <FaPhone />
              <Link href="/contact-us">تماس با ما</Link>
            </li>
            <li>
              <FaLaptop />
              <Link href="/about-us">درباره ما</Link>
            </li>
            <li>
              <FaRuler />
              <Link href="/rules">قوانین</Link>
            </li>
          </ul>
          <section>
            <ul className={`${styles.links} ${styles.infos}`}>
              {user ? (
                <li>
                  <IoMdSettings />
                  <Link href="/p-user">پنل کاربری</Link>
                </li>
              ) : (
                <li>
                  <FaArrowRightToBracket />
                  <Link href="/login-register">ورود / ثبت نام</Link>
                </li>
              )}

              {user.role === "ADMIN" && (
                <li>
                  <BiSolidDashboard />
                  <Link href="/p-admin">پنل مدیریت</Link>
                </li>
              )}
              <li>
                <FaBasketShopping />
                <Link href="/cart">سبد خرید</Link>
              </li>
            </ul>
          </section>
        </main>
      </div>

      <Overlay isShow={isShowOverlay} onShow={setIsShowOverlay} />
    </>
  );
}

export default MobileNav;
