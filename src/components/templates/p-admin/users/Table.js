"use client";
import React from "react";
import styles from "./table.module.css";
import swal from "sweetalert";
import { useRouter } from "next/navigation";
import { showSwal } from "@/utils/helper";
import Modal from "@/components/modules/modal/Modal";
import EditModal from "./EditModal";
export default function DataTable({ users, title }) {
  const router = useRouter();

  const changeRole = async (userID) => {
    swal({
      title: "آیا از تغییر نقش اطمینان دارید ؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch(`/api/user/${userID}`, {
          method: "PATCH",
        });

        if (res.status === 200) {
          showSwal("نقش با موفقیت تغییر کرد", "success", "خیلی هم عالی", () => {
            router.refresh();
          });
        }
      }
    });
  };

  const removeUser = async (userID) => {
    // codes
    swal({
      title: "آیا از حذف کاربر اطمینان دارید ؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch(`/api/user/${userID}`, {
          method: "DELETE",
        });

        if (res.status === 200) {
          showSwal("کاربر با موفقیت حذف شد", "success", "خیلی هم عالی", () => {
            router.refresh();
          });
        }
      }
    });
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
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th>ویرایش</th>
              <th>تغییر سطح</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email ? user.email : "ایمیل یافت نشد"}</td>
                <td>{user.role === "USER" ? "کاربر عادی" : "مدیر"}</td>
                <td>
                  <Modal>
                    <Modal.Open name={"edit"}>
                      <button type="button" className={styles.edit_btn}>
                        ویرایش
                      </button>
                    </Modal.Open>
                    <Modal.Window name={"edit"}>
                      <EditModal user={user}/>
                    </Modal.Window>
                  </Modal>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => changeRole(user._id)}
                  >
                    تغییر نقش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.delete_btn}
                    onClick={() => removeUser(user._id)}
                  >
                    حذف
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => banUser(user.email, user.phone)}
                    className={styles.delete_btn}
                  >
                    بن
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
