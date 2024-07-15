import React, { useState } from "react";
import styles from "./EditModal.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./EditSchema";
import { showSwal } from "@/utils/helper";
import { useRouter } from "next/navigation";
function EditModal({ user, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: user,
  });

  const editUserInfo = async (data) => {
    setIsLoading(true);
    const res = await fetch(`/api/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user._id, ...data }),
    });

    setIsLoading(false);

    if (res.status === 200) {
      onClose();
      showSwal("کاربر با موفقیت آپدیت شد", "success", "خیلی هم عالی", () => {
        location.reload();
      });
    }
  };
  return (
    <div className={styles.edit_modal}>
      <h2>اطلاعات جدید را وارد کنید</h2>
      <form
        onSubmit={handleSubmit(editUserInfo)}
        className={styles.modal_container}
      >
        <div>
          <input
            disabled={isLoading}
            type="text"
            placeholder="نام کاربر را وارد کنید ..."
            {...register("name")}
          />
          {errors.name && (
            <p className={styles.err_empty}>{errors.name.message}</p>
          )}
        </div>
        <div>
          <input
            disabled={isLoading}
            type="text"
            placeholder="ایمیل کاربر را وارد کنید ..."
            {...register("email")}
          />
          {errors.email && (
            <p className={styles.err_empty}>{errors.email.message}</p>
          )}
        </div>
        <div>
          <input
            disabled={isLoading}
            type="text"
            placeholder="شماره کاربر را وارد کنید ..."
            {...register("phone")}
          />
          {errors.phone && (
            <p className={styles.err_empty}>{errors.phone.message}</p>
          )}
        </div>
        <button disabled={isLoading}>
          {isLoading ? "در حال ویرایش ..." : "ویرایش کاربر"}
        </button>
      </form>
    </div>
  );
}

export default EditModal;
