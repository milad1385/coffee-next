"use client";
import { useState } from "react";
import styles from "./order.module.css";
import Link from "next/link";

const Order = () => {
  const [showZarinPallAlert, setShowZarinPallAlert] = useState(false);
  return (
    <section className={styles.order}>
      <p className={styles.title}>سفارش شما</p>
      <main className={styles.main}>
        <div>
          <p>جمع جزء</p>
          <p>محصول</p>
        </div>
        <div>
          <p className={styles.product_price}>205,000 تومان</p>
          <p className={styles.product_name}>
            کپسول قهوه ده عددی روبوستا دبل دارای شیر × 1
          </p>
        </div>
        <div>
          <p className={styles.product_price}>205,000 تومان</p>
          <p className={styles.product_price}>جمع جزء</p>
        </div>
        <div>
          <p className={styles.product_price}>
            پیک موتوری: <strong> 30,000 تومان</strong>
          </p>
          <p className={styles.product_price}>حمل و نقل</p>
        </div>
        <div>
          <div>
            <h2 className={styles.product_price}>235,000 تومان</h2>
          </div>
          <h3>مجموع</h3>
        </div>
      </main>
      <div className={styles.transaction}>
        <div>
          <input
            onClick={() => setShowZarinPallAlert(false)}
            type="radio"
            name="payment_method"
            value="melli"
          />
          <label> بانک ملی</label>
        </div>
        <div>
          <input
            onClick={() => setShowZarinPallAlert(true)}
            type="radio"
            name="payment_method"
            value="zarinpal"
          />
          <label>پرداخت امن زرین پال </label>
        </div>
        {showZarinPallAlert && (
          <div className={styles.paymentBox}>
            <p>
              پرداخت امن به وسیله کلیه کارت های عضو شتاب از طریق درگاه زرین پال
            </p>
          </div>
        )}
        <div className={styles.warning}>
          <p>
            اطلاعات شخصی شما برای پردازش سفارش و پشتیبانی از تجربه شما در این
            وبسایت و برای اهداف دیگری که در{" "}
            <strong>سیاست حفظ حریم خصوصی</strong> توضیح داده شده است استفاده
            می‌شود
          </p>
        </div>
        <div className={styles.accept_rules}>
          <input type="checkbox" name="" id="" />
          <p>
            {" "}
            <strong> شرایط و مقررات</strong>  را خواندم و آن را می
            پذیرم. <span>*</span>
          </p>
        </div>
        <Link href={"/complate-order"}>
          {" "}
          <button className={styles.submit}>ثبت سفارش</button>{" "}
        </Link>
      </div>
    </section>
  );
};

export default Order;
