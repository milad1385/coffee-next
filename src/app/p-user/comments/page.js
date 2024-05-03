import DataTable from "@/components/templates/p-user/comments/DataTable";
import Layout from "@/components/layouts/UserPanelLayout";
import React from "react";
import connectToDB from "@/configs/db";
import Commentmodel from "@/models/Comment";
import { authUser } from "@/utils/serverHelper";
import styles from "./comments.module.css";

const page = async () => {
  connectToDB();
  const user = await authUser();
  const comments = await Commentmodel.find({ user: user._id }, "-__v")
    .sort({ _id: -1 })
    .populate("product", "title");

  return (
    <Layout>
      <main className={styles.main_container}>
        <DataTable
          comments={JSON.parse(JSON.stringify(comments))}
          title="لیست کامنت‌ها"
        />
        {comments.length === 0 && <p>کامنتی وجود ندارد</p>}
      </main>
    </Layout>
  );
};

export default page;
