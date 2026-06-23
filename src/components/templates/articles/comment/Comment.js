"use client";
import { showSwal } from "@/utils/helper";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import commentSchema from "../../product/commentSchema";
import styles from "./comment.module.css";
const Comment = ({ productId, userId }) => {
  const [score, setScore] = useState(5);
  const [isSaved, setIsSaved] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(commentSchema),
  });

  const setUserInfo = () => {
    const date = JSON.parse(localStorage.getItem("userInfo"));
    setValue("email", date?.email ?? "");
    setValue("username", date?.username ?? "");
    if (date?.username) {
      setIsSaved(true);
    }
  };

  useEffect(() => {
    setUserInfo();
  }, []);

  const sendNewComment = async (date) => {
    const { username, message, email } = date;
    if (isSaved) {
      localStorage.setItem("userInfo", JSON.stringify({ username, email }));
    }
    const res = await fetch(`/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        body: message,
        email,
        score,
        product: productId,
        user: userId,
      }),
    });

    if (res.status === 201) {
      showSwal("کامنت با موفقیت ارسال شد", "success", "خیلی هم عالی", () => {
        setValue("message", "");
      });
    }
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(sendNewComment)}>
      <p className={styles.title}>دیدگاه خود را بنویسید</p>
      <p className={styles.commentDesc}>
        ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند{" "}
        <span style={{ color: "red" }}>*</span>
      </p>
      <div className={styles.group}>
        <label htmlFor="">
          دیدگاه شما
          <span style={{ color: "red" }}>*</span>
        </label>
        <textarea
          id="comment"
          name="comment"
          cols="45"
          rows="8"
          required=""
          placeholder=""
          {...register("message")}
        ></textarea>
        {errors.message && (
          <p className={styles.err_p}>{errors.message.message}</p>
        )}
      </div>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label htmlFor="">
            نام
            <span style={{ color: "red" }}>*</span>
          </label>
          <input type="text" {...register("username")} />
          {errors.message && (
            <p className={styles.err_p}>{errors.username.message}</p>
          )}
        </div>
        <div className={styles.group}>
          <label htmlFor="">
            ایمیل
            <span style={{ color: "red" }}>*</span>
          </label>
          <input type="email" {...register("email")} />
          {errors.message && (
            <p className={styles.err_p}>{errors.email.message}</p>
          )}
        </div>
      </div>
      <div className={styles.checkbox}>
        <input
          type="checkbox"
          value={isSaved}
          checked={isSaved}
          onChange={(e) => setIsSaved((prev) => !prev)}
        />
        <p className={styles.checkBoxLabel}>
          ذخیره نام، ایمیل در مرورگر برای دیدگاه بعدی
        </p>
      </div>
      <button className={styles.send_comment_body} type="submit">
        ثبت
      </button>
    </form>
  );
};

export default Comment;
