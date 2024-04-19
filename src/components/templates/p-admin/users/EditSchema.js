import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string()
    .required("نام کاربر را وارد کنید")
    .min(3, "نام کاربر حداقل باید 3 کارکتر باشد")
    .max(25, "نام کاربر حداکثر باید 25 کارکتر باشد"),
  phone: Yup.string()
    .min(11, "شماره حداقل باید 11 کاراکتر داشته باشه")
    .max(11, "شماره حداکثر باید 11 کاراکتر داشته باشه"),
  email: Yup.string().email("ایمیل وارد شده معتبر نمی‌باشد"),
});

export default schema;
