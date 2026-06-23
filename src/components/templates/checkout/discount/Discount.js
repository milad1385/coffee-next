"use client";
import React, { useState } from "react";
import styles from "@/styles/checkout.module.css";
function Discount() {
  const [showDiscountForm, setshowDiscountForm] = useState(false);
  return (
    <>
      <div className={styles.discountQuestion}>
        <p>کد تخفیف دارید؟</p>
        <span onClick={() => setshowDiscountForm(true)}>
          برای نوشتن کد اینجا کلیک کنید
        </span>
      </div>
      {showDiscountForm && (
        <div className={styles.discount_container}>
          <p>اگر کد تخفیف دارید لطفا در باکس زیر بنویسید</p>
          <div>
            <input type="text" placeholder="کد تخفیف" />
            <button>اعمال کوپن</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Discount;
