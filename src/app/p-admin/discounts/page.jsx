import Layout from "@/components/layouts/AdminPanelLayout";
import React from "react";
import AddDiscount from "@/components/templates/p-admin/discount/AddDiscount";
import Table from "@/components/templates/p-admin/discount/Table";
import discountsModel from "@/models/Discount";
import connectToDB from "@/configs/db";
async function Discount() {
  const res = await fetch(`http://localhost:3000/api/discount`, {
    cache: "no-store",
  });
  const discounts = await res.json();
  return (
    <Layout>
      <div className="container">
        <AddDiscount />
        <Table discounts={discounts} title={"لیست کد های تخفیف"} />
      </div>
    </Layout>
  );
}

export default Discount;
