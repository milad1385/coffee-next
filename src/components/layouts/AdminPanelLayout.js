import React from "react";
import styles from "./adminPanelLayout.module.css";
import Sidebar from "@/components/modules/p-admin/Sidebar";
import Topbar from "@/components/modules/p-admin/Topbor";
import { redirect } from "next/navigation";
import { authUser } from "@/utils/serverHelper";
import { cookies } from "next/headers";

const Layout = async ({ children }) => {
  const user = await authUser();
  const refreshToken = cookies().get("refreshToken")?.value;
  if (user) {
    if (user.role !== "ADMIN") {
      return redirect("/login-register");
    }
  } else if(!user && !refreshToken) {
    return redirect("/login-register");
  }

  return (
    <div className={styles.layout}>
      <section className={styles.section}>
        <Sidebar userInfo={JSON.parse(JSON.stringify(user))} />
        <div className={styles.contents}>
          <Topbar userInfo={JSON.parse(JSON.stringify(user))} />
          {children}
        </div>
      </section>
    </div>
  );
};

export default Layout;
