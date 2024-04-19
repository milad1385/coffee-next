"use client";
import React from "react";
import styles from "@/styles/p-admin/products.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./discountSchema";
import { showSwal } from "@/utils/helper";
import { useRouter } from "next/navigation";
function AddDiscount() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const createDiscountCode = async (data) => {
    console.log(data);
    const res = await fetch(`/api/discount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status === 201) {
      showSwal("کد تخفیف با موفقیت ساخته شد", "success", "خیلی هم عالی", () => {
        reset();
        router.refresh();
      });
    }
  };
  return (
    <>
      <h1 className={styles.title}>
        <span>ایجاد کد تخفیف </span>
      </h1>
      <div className={styles.container}>
        <form
          onSubmit={handleSubmit(createDiscountCode)}
          className={styles.add_product}
        >
          <div>
            <input
              type="text"
              placeholder="کد تخفیف را وارد کنید ..."
              {...register("code")}
            />
            {errors.code && (
              <p className={styles.empty_msg}>{errors.code.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="درصد کد تخفیف را وارد کنید ..."
              {...register("percent")}
            />
            {errors.percent && (
              <p className={styles.empty_msg}>{errors.percent.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="حداکثر تعداد استفاده را وارد کنید ..."
              {...register("maxUsage")}
            />
            {errors.maxUsage && (
              <p className={styles.empty_msg}>{errors.maxUsage.message}</p>
            )}
          </div>
          <button type="submit">ایجاد کد تخفیف</button>
        </form>
      </div>
    </>
  );
}

export default AddDiscount;
