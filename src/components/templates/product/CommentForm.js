import { IoMdStar } from "react-icons/io";
import styles from "./commentForm.module.css";
import { useEffect, useState } from "react";
import { showSwal } from "@/utils/helper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import commentSchema from "./commentSchema";
const CommentForm = ({ productId, userId }) => {
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

  const handleSetScore = async (score) => {
    setScore(score);
    showSwal(
      `امتیاز ${score} با موفقیت ثبت شد`,
      "success",
      "خیلی هم عالی",
      () => {}
    );
  };

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
      <p>
        نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند{" "}
        <span style={{ color: "red" }}>*</span>
      </p>
      <div className={styles.rate}>
        <p>امتیاز شما :</p>
        <div>
          <IoMdStar onClick={() => handleSetScore(5)} />
          <IoMdStar onClick={() => handleSetScore(4)} />
          <IoMdStar onClick={() => handleSetScore(3)} />
          <IoMdStar onClick={() => handleSetScore(2)} />
          <IoMdStar onClick={() => handleSetScore(1)} />
        </div>
      </div>
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
        <p>
          {" "}
          ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که دوباره دیدگاهی
          می‌نویسم.
        </p>
      </div>
      <button className={styles.send_comment_body} type="submit">
        ثبت
      </button>
    </form>
  );
};

export default CommentForm;
