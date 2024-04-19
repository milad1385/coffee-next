import * as Yup from "yup";

const schema = Yup.object().shape({
  code: Yup.string()
    .required("کد تخفیف را وارد کنید ...")
    .min(3, "کد تخفیف حداقل باید 3 کاراکتر باشد")
    .max(15, "کد تخفیف حداکثر باید 15 کاراکتر باشد"),
  percent: Yup.string().required("درصد کد تخفیف را وارد کنید ..."),
  maxUsage: Yup.string().required("حداکثر تعداد استفاده را وارد کنید ..."),
});

export default schema;
