"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/p-user/accountDetails.module.css";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineDelete } from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "./AccountSchema";
import { showSwal } from "@/utils/helper";
import { useRouter } from "next/navigation";

function AccountDetails() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [image, setImage] = useState("");
  const [tempImage, setTempImage] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const getInputsInfo = async () => {
    const res = await fetch(`/api/auth/me`);
    const userInfo = await res.json();
    console.log(userInfo);
    setValue("name", userInfo.name);
    setValue("email", userInfo.email);
    setValue("phone", userInfo.phone);
    setUserId(userInfo._id);
    setTempImage(userInfo?.image);
  };

  useEffect(() => {
    getInputsInfo();
  }, []);
  const updateUser = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("image", image);

    const res = await fetch(`/api/user/${userId}`, {
      method: "PUT",
      body: formData,
    });

    if (res.status === 200) {
      showSwal(
        "اطلاعات شما با موفقیت آپدیت شد",
        "success",
        "خیلی هم عالی",
        async () => {
          const res = await fetch(`/api/auth/logout`);
          if (res.status === 200) {
            router.refresh();
            router.replace("/login-register");
          }
        }
      );
    }
  };

  const changeUserPassword = async () => {
    const oldPassword = getValues("oldPassword");
    const newPassword = getValues("newPassword");

    const res = await fetch(`/api/user/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newPassword, oldPassword }),
    });

    if (res.status === 200) {
      showSwal(
        "رمز عبور با موفقیت تغییر کرد",
        "success",
        "خیلی هم عالی",
        async () => {
          const res = await fetch(`/api/auth/logout`);
          if (res.status === 200) {
            router.refresh();
            router.replace("/login-register");
          }
        }
      );
    } else {
      showSwal("رمز عبور فعلی اشتباه است", "error", "تلاش مجدد", () => {});
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit(updateUser)} className={styles.details}>
        <h1 className={styles.title}>
          <span> جزئیات اکانت</span>
        </h1>
        <div className={styles.details_main}>
          <section>
            <div className={styles.detail_input}>
              <label>نام کاربری</label>
              <input
                placeholder="لطفا نام کاربری خود را وارد کنید"
                type="text"
                {...register("name")}
              />
              {errors.name && (
                <div className={styles.err_msg}>{errors.name.message}</div>
              )}
            </div>
            <div className={styles.detail_input}>
              <label>ایمیل</label>
              <input
                placeholder="لطفا ایمیل خود را وارد کنید"
                type="text"
                {...register("email")}
              />
              {errors.email && (
                <div className={styles.err_msg}>{errors.email.message}</div>
              )}
            </div>
            <div className={styles.detail_input}>
              <label>شماره تماس</label>
              <input
                placeholder="لطفا شماره تماس خود را وارد کنید"
                type="number"
                {...register("phone")}
              />
              {errors.phone && (
                <div className={styles.err_msg}>{errors.phone.message}</div>
              )}
            </div>
          </section>
          <section>
            <div className={styles.uploader}>
              <img
                src={
                  tempImage
                    ? tempImage
                    : "http://localhost:3000/uploads/user.png"
                }
                alt=""
              />
              <div>
                <div>
                  <button>
                    <IoCloudUploadOutline />
                    تغییر
                  </button>
                  <input
                    type="file"
                    onChange={(e) => {
                      setImage(e.target.files[0]);
                      setTempImage(URL.createObjectURL(e.target.files[0]));
                    }}
                  />
                </div>
                <button>
                  <MdOutlineDelete />
                  حذف
                </button>
              </div>
            </div>
            <div>
              <label>رمز عبور فعلی</label>
              <div className={styles.password_group}>
                <input type="password" {...register("oldPassword")} />
              </div>
            </div>
            <div>
              <label>رمز عبور جدید</label>
              <div className={styles.password_group}>
                <input type="password" {...register("newPassword")} />
                <button onClick={changeUserPassword} type="button">
                  تغییر رمز عبور
                </button>
              </div>
            </div>
          </section>
        </div>
        <button type="submit" className={styles.submit_btn}>
          ثبت تغییرات
        </button>
      </form>
    </main>
  );
}

export default AccountDetails;
