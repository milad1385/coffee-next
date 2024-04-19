import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Stepper from "@/components/modules/stepper/Stepper";
import Table from "@/components/templates/cart/Table";
import styles from "@/styles/cart.module.css";
import Link from "next/link";
import { TbShoppingCartX } from "react-icons/tb";

const page = () => {
  return (
    <>
      <Navbar />
      <Stepper step="cart" />

      <main className={styles.cart} data-aos="fade-up">
        <Table />
      </main>
      <Footer />
    </>
  );
};

export default page;
