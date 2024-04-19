import React from "react";
import styles from "./Nabvar.module.css";
import Link from "next/link";
import wishesListModel from "@/models/Wishlist";
import { FaRegHeart } from "react-icons/fa";
import { authUser } from "@/utils/serverHelper";
import Cart from "./Cart";
import ProfileBox from "./ProfileBox";

async function Navbar() {
  const user = await authUser();
  const wishesList = await wishesListModel.find({ user: user._id });
  return (
    <nav className={styles.navbar}>
      <main>
        <div>
          <Link href="/">
            <img src="/images/logo.png" alt="Logo" />
          </Link>
        </div>

        <ul className={styles.links}>
          <li>
            <Link href="/">صفحه اصلی</Link>
          </li>
          <li>
            <Link href="/category">فروشگاه</Link>
          </li>
          <li>
            <Link href="/blog">وبلاگ</Link>
          </li>
          <li>
            <Link href="/contact-us">تماس با ما</Link>
          </li>
          <li>
            <Link href="/about-us">درباره ما</Link>
          </li>
          <li>
            <Link href="/rules">قوانین</Link>
          </li>
          {/**/}

          {/* Start My-account section */}
          {/* {user ? (
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
          )} */}

          <ProfileBox />

          {/* Finish My-account section */}
        </ul>

        <div className={styles.navbar_icons}>
          <Cart />
          <Link href="/wishlist">
            <FaRegHeart />
            <span>{wishesList.length}</span>
          </Link>
        </div>
      </main>
    </nav>
  );
}

export default Navbar;
