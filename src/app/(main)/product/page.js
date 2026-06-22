import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import ProductFilters from "@/components/modules/product/ProductFilters";
import ProductsItems from "@/components/templates/index/latest/Products";
import connectToDB from "@/configs/db";
import productsModel from "@/models/Product";
import styles from "./../../../styles/products.module.css";
import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import ProductsFilters from "@/components/modules/product/ProductsFilters";
import Pagination from "@/components/modules/product/Pagination";
import { productsData } from "@/utils/stateData";

const page = async ({ searchParams }) => {
  await connectToDB();
  const productsList = await productsModel.find({}).limit(8);
  const page = parseInt(searchParams.page) || 1;
  const sort = searchParams.sort || "newest";
  const search = searchParams.search || "";
  const brand = searchParams.brand || "";
  const category = searchParams.category || "";
  const minPrice = searchParams.minPrice ? parseInt(searchParams.minPrice) : 0;
  const maxPrice = searchParams.maxPrice
    ? parseInt(searchParams.maxPrice)
    : Infinity;

  const brands = [...new Set(productsData.map((p) => p.brand))];
  const categories = [...new Set(productsData.map((p) => p.category))];

  return (
    <>
      <div className={styles.productspage}>
        <Navbar />
        <Breadcrumb route="لیست محصولات" />
        <ProductsFilters
          filterContent={
            <ProductFilters
              isMobile
              brands={brands}
              categories={categories}
              currentFilters={{
                brand,
                category,
                minPrice,
                maxPrice,
                search,
                sort,
              }}
            />
          }
          currentSort={sort}
        />
        <div className={styles.container}>
          <main className={styles.mainContent}>
            <main data-aos="fade-up" className={styles.products}>
              <ProductsItems products={productsList} />
            </main>
            <Pagination currentPage={page} totalPages={10} />
          </main>
          <aside className={styles.sidebar}>
            <ProductFilters
              brands={brands}
              categories={categories}
              currentFilters={{
                brand,
                category,
                minPrice,
                maxPrice,
                search,
                sort,
              }}
            />
          </aside>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default page;
