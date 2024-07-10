import Layout from "@/components/layouts/AdminPanelLayout";
import React from "react";
import AddDiscount from "@/components/templates/p-admin/discount/AddDiscount";
import Table from "@/components/templates/p-admin/discount/Table";
import discountsModel from "@/models/Discount";
import connectToDB from "@/configs/db";
async function Discount() {
  connectToDB();
  const discounts = await discountsModel.find({});
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
