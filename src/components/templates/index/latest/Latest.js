import Link from "next/link";
import styles from "./latest.module.css";
import { FaChevronLeft } from "react-icons/fa6";
import Product from "@/components/modules/product/Product";
import productsModel from "@/models/Product";
import connectToDB from "@/configs/db";

const Latest = async () => {
  connectToDB();
  const products = await productsModel.find({}).limit(8);
  return (
    <div className={styles.container}>
      <section className={styles.title}>
        <div>
          <p>آخرین محصولات</p>
          <span>پیش به سوی کیفیت</span>
        </div>
        <Link className={styles.link} href={"/category"}>
          مشاهده همه <FaChevronLeft />{" "}
        </Link>
      </section>
      <main data-aos="fade-up" className={styles.products}>
        {products.map((product) => (
          <Product productInfo={product} key={product._id} />
        ))}
      </main>
    </div>
  );
};

export default Latest;
