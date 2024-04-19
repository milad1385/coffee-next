import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./register.module.css";
import Sms from "./Sms";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "./registerSchema";
import { showSwal } from "@/utils/helper";
const Register = ({ showloginForm }) => {
  const router = useRouter();
  const [isRegisterWithPass, setIsRegisterWithPass] = useState(false);
  const [isRegisterWithOtp, setIsRegisterWithOtp] = useState(false);

  const hideOtpForm = () => setIsRegisterWithOtp(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerUserHandler = async (data) => {
    const res = await fetch(`/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.status === 201) {
      showSwal("کاربر با موفقیت ثبت نام شد", "success", "ورود به پنل", () => {
        router.replace("/");
        router.refresh();
      });
    } else if (res.status === 419) {
      showSwal(
        "اطلاعات وارد شده قبلا استفاده شده است",
        "error",
        "تلاش مجدد",
        () => {}
      );
    } else {
      showSwal(
        "اطلاعات وارد شده معتبر نمی باشد",
        "error",
        "تلاش مجدد",
        () => {}
      );
    }
  };
  return (
    <>
      {!isRegisterWithOtp ? (
        <>
          <form
            onSubmit={handleSubmit(registerUserHandler)}
            className={styles.form}
          >
            <div className={styles.input_wrapper}>
              <input
                className={styles.input}
                autoComplete="false"
                type="text"
                placeholder="نام"
                {...register("name")}
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div className={styles.input_wrapper}>
              <input
                className={styles.input}
                type="text"
                placeholder="شماره موبایل  "
                {...register("phone")}
              />
              {errors.phone && <p>{errors.phone.message}</p>}
            </div>
            <div className={styles.input_wrapper}>
              <input
                className={styles.input}
                type="email"
                placeholder="ایمیل (دلخواه)"
                {...register("email")}
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>

            {isRegisterWithPass && (
              <div className={styles.input_wrapper}>
                <input
                  className={styles.input}
                  type="password"
                  placeholder="رمز عبور"
                  {...register("password")}
                />
                {errors.password && <p>{errors.password.message}</p>}
              </div>
            )}

            <p
              style={{ marginTop: "1.5rem" }}
              className={styles.btn}
              onClick={() => setIsRegisterWithOtp(true)}
            >
              ثبت نام با کد تایید
            </p>

            {isRegisterWithPass && (
              <button
                type={isRegisterWithPass ? "" : "button"}
                style={{ marginTop: ".7rem" }}
                onClick={() => setIsRegisterWithPass(true)}
                className={styles.btn}
              >
                ثبت نام با رمزعبور
              </button>
            )}
            {!isRegisterWithPass && (
              <button
                type="button"
                style={{ marginTop: ".7rem" }}
                onClick={() => setIsRegisterWithPass(true)}
                className={styles.btn}
              >
                ثبت نام با رمزعبور
              </button>
            )}
            <p onClick={showloginForm} className={styles.back_to_login}>
              برگشت به ورود
            </p>
          </form>
          <p className={styles.redirect_to_home}>لغو</p>
        </>
      ) : (
        <Sms hideOtpForm={hideOtpForm} />
      )}
    </>
  );
};

export default Register;
