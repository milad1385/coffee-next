import React from "react";
import styles from "./userPanelLayout.module.css";
import Sidebar from "@/components/modules/p-user/Sidebar";
import Topbar from "@/components/modules/p-user/Topbar";
import { authUser } from "@/utils/serverHelper";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const Layout = async ({ children }) => {
  const user = await authUser();
  const refreshToken = cookies().get("refreshToken")?.value;
  if (!user && !refreshToken) {
    redirect("/login-register");
  }

  return (
    <div className={styles.layout}>
      <section className={styles.section}>
        <Sidebar user={user.name} />
        <div className={styles.contents}>
          <Topbar />
          {children}
        </div>
      </section>
    </div>
  );
};

export default Layout;
