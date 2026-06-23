"use client";
import React from "react";
import styles from "./ProductSort.module.css";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
function ProductSort() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const router = useRouter();
  const sort = searchParams.get("sort") || "newest";

  const handleSortClick = (value) => {
    params.set("sort", value.trim());
    router.push(`${pathname}?${params}`);
  };
  return (
    <div className={styles.sortContainer}>
      <div
        className={sort === "newest" ? styles.sortItemActive : ""}
        onClick={() => handleSortClick("newest")}
      >
        جدید ترین
      </div>
      <div
        className={sort === "oldest" ? styles.sortItemActive : ""}
        onClick={() => handleSortClick("oldest")}
      >
        قدیمی‌ ترین
      </div>
      <div
        className={sort === "expensive" ? styles.sortItemActive : ""}
        onClick={() => handleSortClick("expensive")}
      >
        گران‌ ترین
      </div>
      <div
        className={sort === "cheap" ? styles.sortItemActive : ""}
        onClick={() => handleSortClick("cheap")}
      >
        ارزان‌ ترین
      </div>
      <div
        className={sort === "popular" ? styles.sortItemActive : ""}
        onClick={() => handleSortClick("popular")}
      >
        محبوب ترین
      </div>
    </div>
  );
}

export default ProductSort;
