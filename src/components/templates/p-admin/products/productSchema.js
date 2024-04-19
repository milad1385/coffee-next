import * as Yup from "yup";

const schema = Yup.object().shape({
  title: Yup.string()
    .required("عنوان محصول را وارد کنید ...")
    .min(3, "عنوان حداقل باید 3 کارکتر باشد")
    .max(25, "عنوان حداکثر باید 25 کارکتر باشد"),
  price: Yup.string().required("قیمت محصول را وارد کنید ..."),
  shortDesc: Yup.string()
    .required("توضیحات کوتاه را وارد کنید ...")
    .min(5, "حداقل 5 کارکتر وارد کنید ..."),
  longDesc: Yup.string()
    .required("توضیحات بلند را وارد کنید ...")
    .min(5, "حداقل 5 کارکتر وارد کنید ..."),
  link: Yup.string()
    .required("توضیحات بلند را وارد کنید ...")
    .min(5, "حداقل 5 کارکتر وارد کنید ..."),
  tags: Yup.string()
    .required("تگ های محصول را وارد کنید ...")
    .min(3, "حداقل تگ محصول 3 کارکتر وارد کنید ..."),
  count: Yup.string().required(" تعداد محصول را وارد کنید ..."),
  weight: Yup.string().required(" وزن محصول را وارد کنید ..."),
  smell: Yup.string().required(" میزان بو محصول را وارد کنید ..."),
  sutaibleFor: Yup.string().required("  مخاطب هدف این محصول را وارد کنید ..."),
});

export default schema;
