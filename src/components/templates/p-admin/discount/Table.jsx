"use client";
import React from "react";
import styles from "./../comments/table.module.css";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import { showSwal } from "@/utils/helper";
export default function DataTable({ title, discounts }) {
  const router = useRouter();

  const deleteDiscount = async (discountId) => {
    swal({
      title: "آیا از حذف کد تخفیف اطمینان دارید ؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch(`/api/discount/${discountId}`, {
          method: "DELETE",
        });
        if (res.status === 200) {
          showSwal("کد با موفقیت حذف شد", "success", "خیلی هم عالی", () => {
            router.refresh();
          });
        }
      }
    });
  };
  return (
    <div className={styles.main_container}>
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
              <th>کد</th>
              <th>درصد</th>
              <th>حداکثر استفاده</th>
              <th>استفاده شده</th>
              <th>تاریخ</th>
              <th>سازنده</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount, index) => (
              <tr key={discount._id}>
                <td
                  className={
                    discount.maxUsage === discount.usage
                      ? styles.Expired
                      : styles.noExpired
                  }
                >
                  {(index + 1).toLocaleString("fa")}
                </td>
                <td>{discount.code}</td>
                <td>{discount.percent}%</td>
                <td>{discount.maxUsage}</td>
                <td>{discount.usage}</td>
                <td>
                  {new Date(discount.createdAt).toLocaleDateString("fa-IR")}
                </td>
                <td>{discount.creator.name}</td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => deleteDiscount(discount._id)}
                  >
                    حذف
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
