import React, { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import Sms from "./Sms";
import { showSwal } from "@/utils/helper";
import { useRouter } from "next/navigation";

const Login = ({ showRegisterForm }) => {
  const router = useRouter();
  const [isLoginWithOtp, setIsLoginWithOtp] = useState(false);
  const [identifire, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const hideOtpForm = () => setIsLoginWithOtp(false);

  const loginHandler = async () => {
    if (!identifire) {
      return showSwal(
        "ایمیل یا تلفن همراه خود را وارد کنید",
        "error",
        "تلاش مجدد",
        () => {}
      );
    }

    if (!password || password.length < 8) {
      return showSwal(
        "پسورد شما قابل حدس میباشد",
        "error",
        "تلاش مجدد",
        () => {}
      );
    }

    const res = await fetch(`/api/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ identifire, password }),
    });

    if (res.status === 200) {
      showSwal("کاربر با موفقیت لاگین شد", "success", "ورود به پنل", () => {
        router.replace("/");
        router.refresh();
      });
    } else if (res.status === 404) {
      showSwal(
        "نام کاربری یا رمز عبور اشتباه میباشد",
        "error",
        "تلاش مجدد",
        () => {}
      );
    } else {
      return showSwal(
        "اطلاعات وارد شده نامعتبر است",
        "error",
        "تلاش مجدد",
        () => {}
      );
    }
  };
  return (
    <>
      {!isLoginWithOtp ? (
        <>
          <div className={styles.form}>
            <input
              className={styles.input}
              type="text"
              placeholder="ایمیل/شماره موبایل"
              value={identifire}
              onChange={(e) => setIdentifier(e.target.value)}
            />
            <input
              className={styles.input}
              type="password"
              placeholder="رمز عبور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.checkbox}>
              <input type="checkbox" name="" id="" />
              <p>مرا به یاد داشته باش</p>
            </div>
            <button className={styles.btn} onClick={loginHandler}>
              ورود
            </button>
            <Link href={"/forget-password"} className={styles.forgot_pass}>
              رمز عبور را فراموش کرده اید؟
            </Link>
            <button
              onClick={() => setIsLoginWithOtp(true)}
              className={styles.btn}
            >
              ورود با کد یکبار مصرف
            </button>
            <span>ایا حساب کاربری ندارید؟</span>
            <button onClick={showRegisterForm} className={styles.btn_light}>
              ثبت نام
            </button>
          </div>
          <Link href={"/"} className={styles.redirect_to_home}>
            لغو
          </Link>
        </>
      ) : (
        <Sms hideOtpForm={hideOtpForm} />
      )}
    </>
  );
};

export default Login;
