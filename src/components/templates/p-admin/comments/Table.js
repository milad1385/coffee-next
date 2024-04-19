"use client";
import React from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";
import { showSwal } from "@/utils/helper";
import swal from "sweetalert";
export default function DataTable({ comments, title }) {
  const router = useRouter();

  const showCommentBody = (body) => {
    showSwal(body, undefined, "بستن", () => {});
  };

  const banUser = async (email, phone) => {
    swal({
      title: "آیا از بن اطمینان دارید ؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch(`/api/user/ban`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone, email }),
        });

        if (res.status === 201) {
          showSwal("کاربر با موفقیت بن شد", "success", "خیلی هم عالی", () => {
            router.refresh();
          });
        }
      }
    });
  };

  const deleteComment = (commentId) => {
    swal({
      title: "آیا از حذف اطمینان دارید ؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch(`/api/comments/${commentId}`, {
          method: "DELETE",
        });

        if (res.status === 200) {
          showSwal("کامنت با موفقیت حذف شد", "success", "خیلی هم عالی", () => {
            router.refresh();
          });
        }
      }
    });
  };

  const acceptOrDeclineComment = (commentId, mode) => {
    swal({
      title: `آیا از ${mode ? "تایید" : "رد"} اطمینان دارید ؟`,
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch(`/api/comments/${commentId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mode }),
        });

        if (res.status === 200) {
          showSwal(
            `کامنت با موفقیت ${mode ? "تایید" : "رد"} شد`,
            "success",
            "خیلی هم عالی",
            () => {
              router.refresh();
            }
          );
        }
      }
    });
  };

  return (
    <div>
      <div>
        <h1 className={styles.title}>
          <span>{title}</span>
        </h1>
      </div>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام</th>
              <th>ایمیل</th>
              <th>امتیاز</th>
              <th>محصول</th>
              <th>تاریخ</th>
              <th>مشاهده</th>
              <th>حذف</th>
              {/* <th>پاسخ</th> */}
              <th>بن</th>
              <th>وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr key={comment._id}>
                <td className={comment.isAccept ? styles.open : styles.close}>
                  {(index + 1).toLocaleString("fa")}
                </td>
                <td>{comment.username}</td>
                <td>{comment.email}</td>
                <td>{comment.score}</td>
                <td>{comment.product.title}</td>
                <td>
                  {new Date(comment.createdAt).toLocaleDateString("fa-IR")}
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => showCommentBody(comment.body)}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => deleteComment(comment._id)}
                  >
                    حذف
                  </button>
                </td>
                {/* <td>
                  <button
                    type="button"
                    className={styles.delete_btn}
                    onClick={() => answerToTicket(ticket)}
                  >
                    پاسخ
                  </button>
                </td> */}
                <td>
                  <button
                    type="button"
                    className={styles.delete_btn}
                    onClick={() => banUser(comment.email, comment.user?.phone)}
                  >
                    بن
                  </button>
                </td>
                <td>
                  {comment.isAccept ? (
                    <button
                      type="button"
                      className={styles.delete_btn}
                      onClick={() => acceptOrDeclineComment(comment._id, false)}
                    >
                      رد
                    </button>
                  ) : (
                    <button
                      type="button"
                      className={styles.delete_btn}
                      onClick={() => acceptOrDeclineComment(comment._id, true)}
                    >
                      تایید
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
