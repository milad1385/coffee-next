"use client";
import React, { useState } from "react";
import styles from "@/styles/p-admin/products.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./productSchema";
import { showSwal } from "@/utils/helper";
import { useRouter } from "next/navigation";
function AddProduct() {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleUpload = (e) => {
    setImages(Array.from(e.target.files));
  };

  console.log(errors);

  const createProduct = async (data) => {
    console.log(data);
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("title", data.title);
    formData.append("price", data.price);
    formData.append("shortDesc", data.shortDesc);
    formData.append("longDesc", data.longDesc);
    formData.append("link", data.link);
    formData.append("tags", data.tags);
    formData.append("count", data.count);
    formData.append("weight", data.weight);
    formData.append("smell", data.smell);
    formData.append("sutaibleFor", data.sutaibleFor);

    const res = await fetch(`/api/products`, {
      method: "POST",
      body: formData,
    });

    if (res.status === 201) {
      showSwal("محصول با موفقیت ساخته شد", "success", "خیلی هم عالی", () => {
        reset();
        router.refresh();
      });
    }
  };
  return (
    <>
      <h1 className={styles.title}>
        <span>ایجاد محصول </span>
      </h1>
      <div className={styles.container}>
        <form
          onSubmit={handleSubmit(createProduct)}
          className={styles.add_product}
        >
          <div>
            <input
              type="text"
              placeholder="عنوان محصول را وارد کنید ..."
              {...register("title")}
            />
            {errors.title && (
              <p className={styles.empty_msg}>{errors.title.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="قیمت محصول را وارد کنید ..."
              {...register("price")}
            />
            {errors.price && (
              <p className={styles.empty_msg}>{errors.price.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="توضیحات کوتاه محصول را وارد کنید ..."
              {...register("shortDesc")}
            />
            {errors.shortDesc && (
              <p className={styles.empty_msg}>{errors.shortDesc.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="توضیحات محصول را وارد کنید ..."
              {...register("longDesc")}
            />
            {errors.longDesc && (
              <p className={styles.empty_msg}>{errors.longDesc.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="لینک محصول را وارد کنید ..."
              {...register("link")}
            />
            {errors.link && (
              <p className={styles.empty_msg}>{errors.link.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="تگ های محصول را وارد کنید ..."
              {...register("tags")}
            />
            {errors.tags && (
              <p className={styles.empty_msg}>{errors.tags.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="تعداد محصول را وارد کنید ..."
              {...register("count")}
            />
            {errors.count && (
              <p className={styles.empty_msg}>{errors.count.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="وزن محصول را وارد کنید ..."
              {...register("weight")}
            />
            {errors.weight && (
              <p className={styles.empty_msg}>{errors.weight.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="میزان بو محصول را وارد کنید ..."
              {...register("smell")}
            />
            {errors.smell && (
              <p className={styles.empty_msg}>{errors.smell.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder=" گروه افراد محصول را وارد کنید ..."
              {...register("sutaibleFor")}
            />
            {errors.sutaibleFor && (
              <p className={styles.empty_msg}>{errors.sutaibleFor.message}</p>
            )}
          </div>
          <div>
            <input multiple type="file" onChange={(e) => handleUpload(e)} />
          </div>
          <button type="submit">ایجاد محصول</button>
        </form>
      </div>
    </>
  );
}

export default AddProduct;
