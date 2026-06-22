"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { useState, useEffect } from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ currentPage, totalPages }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMobile, setIsMobile] = useState(false);

  // تشخیص موبایل
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;

    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    router.push(`${pathname}?${params.toString()}`);
  };

  const getPageNumbers = () => {
    const pages = [];
    // در موبایل فقط 3 صفحه نمایش داده می‌شود
    const maxVisible = isMobile ? 3 : 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= (isMobile ? 3 : 4); i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 2; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        // در موبایل فقط صفحه فعلی و اطرافش
        if (isMobile) {
          for (let i = currentPage - 1; i <= currentPage + 1; i++)
            pages.push(i);
        } else {
          for (let i = currentPage - 1; i <= currentPage + 1; i++)
            pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => changePage(currentPage - 1)}
        className={`${styles.pageBtn} ${styles.prevNextBtn}`}
        disabled={currentPage === 1}
      >
        <FaChevronRight className={styles.prevIcon} />
        <span className={styles.btnText}>قبلی</span>
      </button>

      <div className={styles.pageNumbers}>
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className={styles.ellipsis}>
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => changePage(page)}
              className={`${styles.pageNumber} ${page === currentPage ? styles.active : ""}`}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <button
        onClick={() => changePage(currentPage + 1)}
        className={`${styles.pageBtn} ${styles.prevNextBtn}`}
        disabled={currentPage === totalPages}
      >
        <span className={styles.btnText}>بعدی</span>
        <FaChevronLeft className={styles.nextIcon} />
      </button>
    </div>
  );
};

export default Pagination;
