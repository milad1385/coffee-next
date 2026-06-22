"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FaSortAmountDown } from "react-icons/fa";
import styles from "./SortDropdown.module.css";

const SortDropdown = ({ currentSort }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    const params = new URLSearchParams(searchParams);
    params.set("sort", newSort);
    if (params.get("page") === "1") params.delete("page");
    
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={styles.sortWrapper}>
      <FaSortAmountDown className={styles.sortIcon} />
      <label htmlFor="sortSelect">مرتب‌سازی:</label>
      <select 
        id="sortSelect" 
        className={styles.sortSelect}
        value={currentSort}
        onChange={handleSortChange}
      >
        <option value="newest">جدیدترین</option>
        <option value="oldest">قدیمی‌ترین</option>
        <option value="expensive">گران‌ترین</option>
        <option value="cheap">ارزان‌ترین</option>
        <option value="popular">پرطرفدارترین</option>
      </select>
    </div>
  );
};

export default SortDropdown;