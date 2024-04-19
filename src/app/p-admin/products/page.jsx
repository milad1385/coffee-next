import Layout from "@/components/layouts/AdminPanelLayout";
import React from "react";
import Table from "@/components/templates/p-admin/products/Table";
import AddProduct from "@/components/templates/p-admin/products/AddProduct";
import connectToDB from "@/configs/db";
import productsModel from "@/models/Product";
async function Products() {
  connectToDB();
  const products = await productsModel.find({});
  return (
    <Layout>
      <AddProduct />
      <Table
        products={JSON.parse(JSON.stringify(products))}
        title={"لیست محصولات"}
      />
    </Layout>
  );
}

export default Products;
