import React from "react";
import styles from "./Nabvar.module.css";
import Link from "next/link";
import wishesListModel from "@/models/Wishlist";
import { FaRegHeart } from "react-icons/fa";
import { authUser } from "@/utils/serverHelper";
import Cart from "./Cart";
import ProfileBox from "./ProfileBox";
import MobileNav from "./MobileNav";

async function Navbar() {
  const user = await authUser();
  const wishesList = await wishesListModel.find({ user: user._id });
  return (
    <>
      <MobileNav user={JSON.parse(JSON.stringify(user))} />
      <nav className={styles.navbar}>
        <main>
          <div>
            <Link href="/" className={styles.logo_app}>
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
    </>
  );
}

export default Navbar;
