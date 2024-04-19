"use client";
import React from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";
import { FaRegStar, FaStar } from "react-icons/fa";
export default function DataTable({ products, title }) {
  const router = useRouter();

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
              <th>عنوان</th>
              <th>قیمت</th>
              <th>امتیاز</th>
              <th>لینک</th>
              <th>جزییات</th>
              <th>حذف</th>
              <th>وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{(index + 1).toLocaleString("fa")}</td>
                <td>{product.title}</td>
                <td>{product.price.toLocaleString("fa")} تومان</td>
                <td>
                  {new Array(Math.ceil(product.score))
                    .fill(0)
                    .map((item, index) => (
                      <FaStar key={index} />
                    ))}
                  {new Array(5 - Math.ceil(product.score))
                    .fill(0)
                    .map((item, index) => (
                      <FaRegStar key={index} />
                    ))}
                </td>
                <td>{product.link}</td>
                <td>
                  <button type="button" className={styles.edit_btn}>
                    مشاهده
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.delete_btn}>
                    حذف
                  </button>
                </td>
                <td>
                  <button type="button" className={styles.delete_btn}>
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
