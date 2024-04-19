import * as Yup from "yup";

const commentSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "نام حداقل باید 3 کاراکتر داشته باشه")
    .max(22, "نام حداکثر باید 22 کاراکتر داشته باشه")
    .required("نام را وارد نمایید"),
  message: Yup.string().required("متن پیغام را وارد کنید !!!"),
  email: Yup.string()
    .email("ایمیل وارد شده معتبر نمی‌باشد")
    .min(10, "ایمیل حداقل باید 10 کاراکتر داشته باشه")
    .max(30, "ایمیل حداکثر باید 30 کاراکتر داشته باشه")
    .required("ایمیل را وارد نمایید"),
});

export default commentSchema;
