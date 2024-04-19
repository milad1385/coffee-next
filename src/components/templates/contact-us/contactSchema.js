import * as Yup from "yup";

const contactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "نام و نام خانوادگی حداقل باید 3 کاراکتر داشته باشه")
    .max(22, "نام و نام خانوادگی حداکثر باید 22 کاراکتر داشته باشه")
    .required("نام و نام خانوادگی را وارد نمایید"),
  company: Yup.string().required("نام شرکت را وارد کنید"),
  phone: Yup.string()
    .min(11, "شماره حداقل باید 11 کاراکتر داشته باشه")
    .max(11, "شماره حداکثر باید 11 کاراکتر داشته باشه")
    .required("شماره را وارد نمایید"),
  message: Yup.string().required("متن پیغام را وارد کنید !!!"),
  email: Yup.string()
    .email("ایمیل وارد شده معتبر نمی‌باشد")
    .min(10, "ایمیل حداقل باید 10 کاراکتر داشته باشه")
    .max(30, "ایمیل حداکثر باید 30 کاراکتر داشته باشه")
    .required("ایمیل را وارد نمایید"),
});

export default contactSchema;
