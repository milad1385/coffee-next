"use client";
import React from "react";
import styles from "@/styles/p-user/dataTable.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { showSwal } from "@/utils/helper";

export default function DataTable({ comments, title }) {
  const showCommentBody = (commentBody) => {
    showSwal(commentBody, undefined, "اوکی", () => {});
  };

  return (
    <div>
      <div>
        <h1 className={styles.title}>
          <span>{title}</span>
        </h1>
      </div>
      <div className={styles.Table_Container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>تاریخ</th>
              <th>محصول</th>
              <th>امتیاز</th>
              <th>وضعیت</th>
              <th>مشاهده</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {new Date(comment.createdAt).toLocaleDateString("fa-IR")}
                </td>
                <td>{comment.product.title}</td>
                <td>
                  {new Array(comment.score).fill(0).map((item, index) => (
                    <FaStar key={index} />
                  ))}
                  {new Array(5 - comment.score).fill(0).map((item, index) => (
                    <FaRegStar key={index} />
                  ))}
                </td>
                <td>
                  <button type="button" className={styles.no_check}>
                    {comment.isAccept ? "تایید شده" : "در انتظار تایید"}
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => showCommentBody(comment.body)}
                    className={styles.btn}
                  >
                    مشاهده
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
