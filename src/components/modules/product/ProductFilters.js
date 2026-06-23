// app/category/ProductFilters.jsx
"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  FaSearch,
  FaTag,
  FaMoneyBillWave,
  FaFilter,
  FaUndo,
} from "react-icons/fa";
import styles from "./ProductFilters.module.css";

const ProductFilters = ({ brands, categories, currentFilters, isMobile }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    search: currentFilters.search || "",
    brand: currentFilters.brand || "",
    category: currentFilters.category || "",
    minPrice: currentFilters.minPrice || "",
    maxPrice: currentFilters.maxPrice || "",
  });

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);

    Object.entries(filters).forEach(([key, value]) => {
      if (value && value !== "") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    if (params.get("page") === "1") params.delete("page");

    router.push(`${pathname}?${params.toString()}`);
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      brand: "",
      category: "",
      minPrice: "",
      maxPrice: "",
    });

    const params = new URLSearchParams(searchParams);
    const sort = params.get("sort");
    ["search", "brand", "category", "minPrice", "maxPrice", "page"].forEach(
      (key) => params.delete(key),
    );
    if (sort) params.set("sort", sort);

    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => applyFilters(), 500);
    return () => clearTimeout(timer);
  }, [filters.search]);

  return (
    <div className={styles.filters}>
      <div className={styles.filterHeader}>
        <FaFilter className={styles.filterIcon} />
        <h3 className={styles.title}>فیلتر محصولات</h3>
      </div>

      {/* جستجو */}
      <div className={styles.filterGroup}>
        <label htmlFor="searchInput" className={styles.label}>
          <FaSearch className={styles.labelIcon} />
          جستجو
        </label>
        <input
          id="searchInput"
          type="text"
          placeholder="نام محصول را وارد کنید..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className={styles.input}
        />
      </div>

      {/* برند */}
      <div className={styles.filterGroup}>
        <label htmlFor="brandSelect" className={styles.label}>
          <FaTag className={styles.labelIcon} />
          برند
        </label>
        <select
          id="brandSelect"
          value={filters.brand}
          onChange={(e) => {
            setFilters({ ...filters, brand: e.target.value });
            setTimeout(applyFilters, 0);
          }}
          className={styles.select}
        >
          <option value="">همه برندها</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* دسته‌بندی */}
      <div className={styles.filterGroup}>
        <label htmlFor="categorySelect" className={styles.label}>
          <FaTag className={styles.labelIcon} />
          دسته‌بندی
        </label>
        <select
          id="categorySelect"
          value={filters.category}
          onChange={(e) => {
            setFilters({ ...filters, category: e.target.value });
            setTimeout(applyFilters, 0);
          }}
          className={styles.select}
        >
          <option value="">همه دسته‌ها</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* محدوده قیمت */}
      <div className={styles.filterGroup}>
        <label className={styles.label}>
          <FaMoneyBillWave className={styles.labelIcon} />
          محدوده قیمت
        </label>
        <div className={styles.priceRange}>
          <input
            type="number"
            placeholder="از"
            value={filters.minPrice}
            onChange={(e) => {
              setFilters({ ...filters, minPrice: e.target.value });
              clearTimeout(window.priceTimer);
              window.priceTimer = setTimeout(applyFilters, 300);
            }}
            className={styles.priceInput}
          />
          <span className={styles.priceSeparator}>تا</span>
          <input
            type="number"
            placeholder="تا"
            value={filters.maxPrice}
            onChange={(e) => {
              setFilters({ ...filters, maxPrice: e.target.value });
              clearTimeout(window.priceTimer);
              window.priceTimer = setTimeout(applyFilters, 300);
            }}
            className={styles.priceInput}
          />
        </div>
      </div>

      <button onClick={resetFilters} className={styles.resetBtn}>
        <FaUndo className={styles.resetIcon} />
        بازنشانی فیلترها
      </button>
    </div>
  );
};

export default ProductFilters;
