"use client";
import styles from "./../p-user/sidebar.module.css";
import { ImReply } from "react-icons/im";
import { FaComments, FaHeart, FaShoppingBag, FaUsers } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { MdSms } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import { TbListDetails } from "react-icons/tb";
import Link from "next/link";
import Logout from "./Logout";
import { getShow } from "@/context/UserContext";
import { useEffect } from "react";

const Sidebar = ({ userInfo }) => {
  const {isShow , setIsShow} = getShow();
  const path = usePathname();
  const router = useRouter();


  useEffect(() => {
    setIsShow(false);
  }, [path]);
  return (
    <aside className={`${styles.sidebar} ${isShow ? styles.show : ""}`}>
      <div className={styles.sidebar_header}>
        <p>خوش اومدی {userInfo.name} عزیز</p>
      </div>
      <ul className={styles.sidebar_main}>
        {path.includes("/p-user") ? (
          <>
            <Link href={"/p-user"} className={styles.sidebar_link_active}>
              <ImReply />
              پیشخوان
            </Link>
            <Link href={"/p-user/orders"}>
              <FaShoppingBag />
              سفارش ها
            </Link>
            <Link href={"/p-user/tickets"}>
              <MdSms />
              تیکت های پشتیبانی
            </Link>
            <Link href={"/p-user/comments"}>
              <FaComments />
              کامنت ها
            </Link>
            <Link href={"/p-user/wishlist"}>
              <FaHeart />
              علاقه مندی
            </Link>
            <Link href={"/p-user/account-details"}>
              <TbListDetails />
              جزئیات اکانت
            </Link>
          </>
        ) : (
          <>
            <Link href={"/p-admin"} className={styles.sidebar_link_active}>
              <ImReply />
              پیشخوان
            </Link>

            <Link href={"/p-admin/products"}>
              <FaShoppingBag />
              محصولات
            </Link>
            <Link href={"/p-admin/users"}>
              <FaUsers />
              کاربران
            </Link>
            <Link href={"/p-admin/comments"}>
              <FaComments />
              کامنت ها
            </Link>

            <Link href={"/p-admin/tickets"}>
              <MdSms />
              تیکت ها
            </Link>
            <Link href={"/p-admin/discounts"}>
              <MdOutlineAttachMoney />
              تخفیفات
            </Link>
          </>
        )}
      </ul>
      <Logout />
    </aside>
  );
};

export default Sidebar;
