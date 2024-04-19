import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Product from "@/components/modules/product/Product";
import wishsListModel from "@/models/Wishlist";
import styles from "@/styles/wishlist.module.css";
import { authUser } from "@/utils/serverHelper";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";

const page = async () => {
  const user = await authUser();
  const wishes = await wishsListModel
    .find({ user: user?._id })
    .populate("product", "title score price  images link");
  console.log(wishes);

  return (
    <>
      <Navbar />
      <Breadcrumb route={"علاقه مندی ها"} />
      <main className={styles.container} data-aos="fade-up">
        <p className={styles.title}>محصولات مورد علاقه شما</p>
        <section className={styles.wishes_container}>
          {wishes.length > 0 &&
            wishes.map((wish) => (
              <Product key={wish._id} productInfo={wish.product} />
            ))}
        </section>
      </main>

      {wishes.length === 0 && (
        <div className={styles.wishlist_empty} data-aos="fade-up">
          <FaRegHeart />
          <p>محصولی یافت نشد</p>
          <span>شما هنوز هیچ محصولی در لیست علاقه مندی های خود ندارید.</span>
          <span>در صفحه "فروشگاه" محصولات جالب زیادی پیدا خواهید کرد.</span>
          <div>
            <Link href="/category">بازگشت به فروشگاه</Link>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default page;
