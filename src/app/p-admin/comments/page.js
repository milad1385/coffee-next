import React from "react";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/templates/p-admin/comments/table.module.css";
import Table from "@/components/templates/p-admin/comments/Table";
import CommentModel from "@/models/Comment";
import connectToDB from "@/configs/db";
const Comments = async () => {
  connectToDB();
  const comments = await CommentModel.find({})
    .populate("product", "title")
    .sort({ createdAt: -1 });
  return (
    <Layout>
      <main>
        {comments.length === 0 ? (
          <p className={styles.empty}>کامنتی وجود ندارد</p>
        ) : (
          <Table
            comments={JSON.parse(JSON.stringify(comments))}
            title="لیست کامنت ها"
          />
        )}
      </main>
    </Layout>
  );
};

export default Comments;
