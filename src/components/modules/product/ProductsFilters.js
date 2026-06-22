"use client";
import styles from "./ProductFilter.module.css";
import React, { useState, useEffect } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import { FaArrowsUpDown } from "react-icons/fa6";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

function ProductsFilters({ currentSort = "default", filterContent }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isShowFilterMobile, setIsShowFilterMobile] = useState(false);
  const [isShowMobileOrder, setIsShowMobileOrder] = useState(false);

  useEffect(() => {
    if (isShowFilterMobile || isShowMobileOrder) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isShowFilterMobile, isShowMobileOrder]);

  const handleSortChange = (sortValue) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", sortValue);
    if (params.get("page") === "1") params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
    setIsShowMobileOrder(false);
  };

  const handleFilterOpen = () => {
    setIsShowFilterMobile(true);
  };

  const handleFilterClose = () => {
    setIsShowFilterMobile(false);
  };

  const handleOrderClose = () => {
    setIsShowMobileOrder(false);
  };

  const getSortLabel = () => {
    switch (currentSort) {
      case "default":
      case "newest":
        return "جدید ترین";
      case "oldest":
        return "قدیمی ترین";
      case "expensive":
        return "گران ترین";
      case "cheap":
        return "ارزان ترین";
      case "popular":
        return "محبوب ترین";
      default:
        return "پیش فرض";
    }
  };

  return (
    <>
      <div className={styles.filtersContainer}>
        <div className={styles.filterButton} onClick={handleFilterOpen}>
          <FaFilter className={styles.buttonIcon} />
          <span className={styles.buttonText}>فیلتر</span>
        </div>

        <div
          className={styles.orderButton}
          onClick={() => setIsShowMobileOrder(true)}
        >
          <FaArrowsUpDown className={styles.buttonIcon} />
          <span className={styles.sortLabel}>{getSortLabel()}</span>
        </div>
      </div>

      {isShowFilterMobile && (
        <div className={styles.modalOverlay} onClick={handleFilterClose}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <button
                className={styles.closeButton}
                onClick={handleFilterClose}
              >
                <FaTimes />
              </button>
              <h3 className={styles.modalTitle}>فیلتر محصولات</h3>
            </div>

            <div className={styles.modalBody}>
              {filterContent ? (
                filterContent
              ) : (
                <div className={styles.defaultFilterContent}>
                  <p>محتوای فیلتر در اینجا قرار می‌گیرد</p>
                </div>
              )}
            </div>

            <div className={styles.modalFooter}>
              <button
                className={styles.applyFilterBtn}
                onClick={handleFilterClose}
              >
                اعمال فیلتر
              </button>
            </div>
          </div>
        </div>
      )}

      {isShowMobileOrder && (
        <div className={styles.modalOverlay} onClick={handleOrderClose}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <button className={styles.closeButton} onClick={handleOrderClose}>
                <FaTimes />
              </button>
              <h3 className={styles.modalTitle}>مرتب‌سازی</h3>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.sortOptions}>
                <div
                  className={`${styles.sortOption} ${currentSort === "newest" ? styles.activeSort : ""}`}
                  onClick={() => handleSortChange("newest")}
                >
                  <span>جدید ترین</span>
                </div>
                <div
                  className={`${styles.sortOption} ${currentSort === "oldest" ? styles.activeSort : ""}`}
                  onClick={() => handleSortChange("oldest")}
                >
                  <span>قدیمی‌ ترین</span>
                </div>
                <div
                  className={`${styles.sortOption} ${currentSort === "expensive" ? styles.activeSort : ""}`}
                  onClick={() => handleSortChange("expensive")}
                >
                  <span>گران‌ ترین</span>
                </div>
                <div
                  className={`${styles.sortOption} ${currentSort === "cheap" ? styles.activeSort : ""}`}
                  onClick={() => handleSortChange("cheap")}
                >
                  <span>ارزان‌ ترین</span>
                </div>
                <div
                  className={`${styles.sortOption} ${currentSort === "popular" ? styles.activeSort : ""}`}
                  onClick={() => handleSortChange("popular")}
                >
                  <span>محبوب ترین</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductsFilters;
