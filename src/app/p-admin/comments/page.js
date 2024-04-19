import React from "react";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/templates/p-admin/comments/table.module.css";
import Table from "@/components/templates/p-admin/comments/Table";

const Comments = async () => {
  const res = await fetch(`http://localhost:3000/api/comments`, {
    cache: "no-store",
  });
  const comments = await res.json();

  return (
    <Layout>
      <main>
        {comments.length === 0 ? (
          <p className={styles.empty}>کامنتی وجود ندارد</p>
        ) : (
          <Table comments={comments} title="لیست کامنت ها" />
        )}
      </main>
    </Layout>
  );
};

export default Comments;
