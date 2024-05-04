import styles from "./topbar.module.css";
import { IoIosSearch } from "react-icons/io";
import Notification from "./Notification";
import { authUser } from "@/utils/serverHelper";
import MenuIcon from "./MenuIcon";
const Topbar = async () => {
  const user = await authUser();

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
          <MenuIcon />
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
