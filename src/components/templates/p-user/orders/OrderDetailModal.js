import React from "react";
import styles from "./orderDetailModal.module.css";
import Image from "next/image";
import { FaXmark } from "react-icons/fa6";
function OrderDetailModal({ onClose }) {
  return (
    <div className={styles.modal_container}>
      <div className={styles.productSecion}>
        <div className={styles.productSectionTitle}>
          <h3>محصولات سفارش 5658# </h3>
          <FaXmark onClick={onClose}/>
        </div>
        <div className={styles.productItems}>
          <div className={styles.prouctItem}>
            <Image
              width={1920}
              height={1080}
              alt="image-1"
              src="/uploads/1712500030702coffee-25.png"
              className={styles.productImage}
            />
            <div>
              <p>قهوه کابویی</p>
              <p>قیمت : 250,000</p>
            </div>
          </div>
          <div className={styles.prouctItem}>
            <Image
              width={1920}
              height={1080}
              alt="image-1"
              src="/uploads/1712500030702coffee-25.png"
              className={styles.productImage}
            />
            <div>
              <p>قهوه کابویی</p>
              <p>قیمت : 250,000</p>
            </div>
          </div>
          <div className={styles.prouctItem}>
            <Image
              width={1920}
              height={1080}
              alt="image-1"
              src="/uploads/1712500030702coffee-25.png"
              className={styles.productImage}
            />
            <div>
              <p>قهوه کابویی</p>
              <p>قیمت : 250,000</p>
            </div>
          </div>
          <div className={styles.prouctItem}>
            <Image
              width={1920}
              height={1080}
              alt="image-1"
              src="/uploads/1712500030702coffee-25.png"
              className={styles.productImage}
            />
            <div>
              <p>قهوه کابویی</p>
              <p>قیمت : 250,000</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.groups}>
        <div className={styles.group}>
          <p>تاریخ</p>
          <p>1405/4/2</p>
        </div>
        <div className={styles.group}>
          <p>وضعیت</p>
          <p className={styles.deliverStyle}>تحویل</p>
        </div>
        <div className={styles.group}>
          <p>جمع کل سبد خرید:</p>
          <p>220000 تومان</p>
        </div>
        <div className={styles.group}>
          <p>قیمت نهایی:</p>
          <p>220000 هزار تومان</p>
        </div>
      </div>
      <div></div>
      <button className={styles.modal_btn} onClick={onClose}>
        مشاهده کردم
      </button>
      <div className={styles.modal_bill}>
        <p>آدرس صورت حساب:</p>
        <div>
          <p>میلاد سلامیان</p>
          <p>09336085012</p>
          <p>milad@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailModal;
