import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Stepper from "@/components/modules/stepper/Stepper";
import styles from "@/styles/checkout.module.css";
import Order from "@/components/templates/checkout/order/Order";
import Details from "@/components/templates/checkout/details/Details";

import React from "react";
import Discount from "@/components/templates/checkout/discount/Discount";

function page() {
  return (
    <>
      <Navbar />
      <Stepper step="checkout" />
      <div className={styles.container} data-aos="fade-up">
        <section className={styles.discount}>
          <Discount />
        </section>
        <main className={styles.checkout}>
          <Order />
          <Details />
        </main>
      </div>

      <Footer />
    </>
  );
}

export default page;
