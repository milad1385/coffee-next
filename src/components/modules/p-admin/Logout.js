import React from "react";
import styles from "./sidebar.module.css";
import { MdLogout } from "react-icons/md";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

function Logout() {
  const router = useRouter();
  const logoutHandler = () => {
    swal({
      title: "آیا از خروج اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch("/api/auth/logout");

        if (res.status === 200) {
          swal({
            title: "با موفقیت از اکانت خارج شدین",
            icon: "success",
            buttons: "فهمیدم",
          }).then(() => {
            router.replace("/");
            router.refresh();
          });
        }
      }
    });
  };
  return (
    <div className={styles.logout} onClick={logoutHandler}>
      <MdLogout />
      خروج
    </div>
  );
}

export default Logout;
