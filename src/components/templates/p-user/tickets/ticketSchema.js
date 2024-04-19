import * as Yup from "yup";

const schema = Yup.object().shape({
  title: Yup.string()
    .required("عنوان تیکت را وارد کنید ...")
    .min(3, "عنوان حداقل باید 3 کارکتر باشد")
    .max(25, "عنوان حداکثر باید 25 کارکتر باشد"),
  body: Yup.string()
    .required("متن تیکت را وارد کنید ..."),
});

export default schema;
