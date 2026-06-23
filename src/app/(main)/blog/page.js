import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Pagination from "@/components/modules/product/Pagination";
import Card from "@/components/templates/index/articles/Article";
import styles from "@/styles/articles.module.css";

const page = ({ searchParams }) => {
  const page = searchParams.page || 1;

  return (
    <div>
      <Navbar />
      <Breadcrumb route={"اخبار و مقالات"} />
      <main className={styles.container}>
        <div className={styles.articles}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <Pagination totalPages={10} currentPage={+page} />
      </main>

      <Footer />
    </div>
  );
};

export default page;
