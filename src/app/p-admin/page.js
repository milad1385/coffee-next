
import React from "react";
import AdminPanelLayout from "@/components/layouts/AdminPanelLayout";

import styles from "@/styles/p-admin/index.module.css";
import Box from "@/components/templates/p-user/index/Box";
import SaleChart from "@/components/templates/p-admin/index/SaleChart";
import GrowthChart from "@/components/templates/p-admin/index/GrowthChart";

import TicketModel from "@/models/Ticket";
import UserModel from "@/models/User";
import ProductModel from "@/models/Product";
import connectToDB from "@/configs/db";

async function AdminHomePage() {
  connectToDB();
  const tickets = await TicketModel.find({ isAnswer: false }).lean();
  const users = await UserModel.find({}).lean();
  const products = await ProductModel.find({}).lean();

  return (
    <AdminPanelLayout>
      <main>
        <section className={styles.dashboard_contents}>
          <Box icon={"ticket"} title="مجموع تیکت های دریافتی" value={tickets.length} />
          <Box icon={"product"} title="مجموع محصولات سایت" value={products.length} />
          <Box icon={"basket"} title="مجموع سفارشات" value="333" />
          <Box icon={"users"} title="مجموع کاربر های سایت" value={users.length} />
        </section>{" "}
        <div className={styles.dashboard_charts}>
          <section>
            <p>آمار فروش</p>
            <SaleChart />
          </section>
          <section>
            <p>نرخ رشد</p>
            <GrowthChart />
          </section>
        </div>
      </main>
    </AdminPanelLayout>
  );
}

export default AdminHomePage;
