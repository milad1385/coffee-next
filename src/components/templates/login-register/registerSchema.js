import * as Yup from "yup";

const schema = Yup.object().shape({
  name: Yup.string()
    .required("نام و نام خانوادگی را وارد نمایید")
    .min(3, "نام و نام خانوادگی حداقل باید 3 کاراکتر داشته باشه")
    .max(18, "نام و نام خانوادگی حداکثر باید 12 کاراکتر داشته باشه"),
  phone: Yup.string()
    .min(11, "شماره حداقل باید 11 کاراکتر داشته باشه")
    .max(11, "شماره حداکثر باید 11 کاراکتر داشته باشه"),
  password: Yup.string().min(8, "رمز عبور حداقل باید 8 کاراکتر داشته باشه"),
  email: Yup.string().email("ایمیل وارد شده معتبر نمی‌باشد"),
});

export default schema;
