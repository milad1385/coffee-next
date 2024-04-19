"use client";
import { useForm } from "react-hook-form";
import styles from "./form.module.css";
import { showSwal } from "@/utils/helper";
import { yupResolver } from "@hookform/resolvers/yup";
import contactSchema from "./contactSchema";

const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(contactSchema) });

  const submitMessage = async (data) => {
    console.log(data);
    const res = await fetch(`/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status === 201) {
      showSwal(
        "پیغام مورد نظر با موفقیت ارسال شد",
        "success",
        "خیلی هم عالی",
        () => {
          reset();
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(submitMessage)} className={styles.form}>
      <span>فرم تماس با ما</span>
      <p>برای تماس با ما می توانید فرم زیر را تکمیل کنید</p>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label>نام و نام خانوادگی</label>
          <input type="text" {...register("name")} />
          {errors.name && (
            <div className={styles.err}>{errors.name.message}</div>
          )}
        </div>
        <div className={styles.group}>
          <label>آدرس ایمیل</label>
          <input type="text" {...register("email")} />
          {errors.email && (
            <div className={styles.err}>{errors.email.message}</div>
          )}
        </div>
      </div>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label>شماره تماس</label>
          <input type="text" {...register("phone")} />
          {errors.phone && (
            <div className={styles.err}>{errors.phone.message}</div>
          )}
        </div>
        <div className={styles.group}>
          <label>نام شرکت</label>
          <input type="text" {...register("company")} />
          {errors.company && (
            <div className={styles.err}>{errors.company.message}</div>
          )}
        </div>
      </div>
      <div className={styles.group}>
        <label>درخواست شما</label>
        <textarea {...register("message")} cols="30" rows="3"></textarea>
        {errors.message && (
          <div className={styles.err}>{errors.message.message}</div>
        )}
      </div>
      <button type="submit">ارسال</button>
    </form>
  );
};

export default Form;
