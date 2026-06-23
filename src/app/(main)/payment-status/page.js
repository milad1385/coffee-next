// app/payment-status/page.js
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Stepper from "@/components/modules/stepper/Stepper";
import styles from "@/styles/payment-status.module.css";
import Link from "next/link";
import React from "react";
import { FaCheckCircle, FaTimesCircle, FaPrint } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";

function page({ searchParams }) {
  const status = searchParams.status || "success";
  const orderId = searchParams.orderId || "128387";
  const amount = searchParams.amount || "230,000";
  const date = searchParams.date || "2 تیر 1405";
  const paymentMethod = searchParams.paymentMethod || "بانک ملی";
  const refId = searchParams.refId || "1234567890";

  const successData = {
    title: "پرداخت موفق",
    message: "سپاس از خرید شما! سفارش شما با موفقیت ثبت شد.",
    icon: <FaCheckCircle className={styles.successIcon} />,
    color: "#711d1c",
    bgColor: "#f8f0f0",
    borderColor: "#711d1c",
  };

  const failedData = {
    title: "پرداخت ناموفق",
    message: "متأسفانه پرداخت شما با مشکل مواجه شد. لطفاً مجدداً تلاش کنید.",
    icon: <FaTimesCircle className={styles.failedIcon} />,
    color: "#dc3545",
    bgColor: "#fdf0f0",
    borderColor: "#dc3545",
  };

  const paymentInfo = status === "success" ? successData : failedData;

  return (
    <>
      <Navbar />
      <Stepper step={status === "success" ? "complate" : "payment"} />

      <main className={styles.container} data-aos="fade-up">
        <div
          className={`${styles.box} ${status === "success" ? styles.successBox : styles.failedBox}`}
        >
          <div className={styles.iconWrapper}>
            {paymentInfo.icon}
            <h2 className={styles.title}>{paymentInfo.title}</h2>
          </div>

          <p className={styles.message}>{paymentInfo.message}</p>

          <div className={styles.orderInfo}>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.label}>شماره سفارش:</span>
                <span className={styles.value}>{orderId}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>تاریخ:</span>
                <span className={styles.value}>{date}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>مبلغ پرداختی:</span>
                <span className={`${styles.value} ${styles.amount}`}>
                  {amount.toLocaleString()} تومان
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>روش پرداخت:</span>
                <span className={styles.value}>{paymentMethod}</span>
              </div>
              {status === "success" && refId && (
                <div className={styles.infoItem}>
                  <span className={styles.label}>کد رهگیری:</span>
                  <span className={styles.value}>{refId}</span>
                </div>
              )}
            </div>
          </div>

          <div className={styles.actions}>
            {status === "success" ? (
              <>
                <Link href="/p-user/orders" className={styles.primaryBtn}>
                  مشاهده سفارشات
                </Link>
                <button className={styles.secondaryBtn}>
                  <IoMdDownload />
                  دریافت فاکتور
                </button>
                <button className={styles.secondaryBtn}>
                  <FaPrint />
                  چاپ فاکتور
                </button>
              </>
            ) : (
              <>
                <Link href="/checkout" className={styles.primaryBtn}>
                  تلاش مجدد برای پرداخت
                </Link>
                <Link href="/" className={styles.secondaryBtn}>
                  بازگشت به صفحه اصلی
                </Link>
              </>
            )}
          </div>

          <div className={styles.helpLinks}>
            <Link href="/" className={styles.helpLink}>
              صفحه اصلی
            </Link>
            <span className={styles.separator}>|</span>
            <Link href="/contact" className={styles.helpLink}>
              تماس با ما
            </Link>
            <span className={styles.separator}>|</span>
            <Link href="/faq" className={styles.helpLink}>
              سوالات متداول
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default page;
