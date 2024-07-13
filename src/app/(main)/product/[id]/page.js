import styles from "@/styles/product.module.css";
import Gallery from "@/components/templates/product/Gallery";
import Details from "@/components/templates/product/Details";
import Tabs from "@/components/templates/product/Tabs";
import MoreProducts from "@/components/templates/product/MoreProducts";
import productsModel from "@/models/Product";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import connectToDB from "@/configs/db";
import wishsListModel from "@/models/Wishlist";
import { authUser } from "@/utils/serverHelper";


const product = async ({ params }) => {
  connectToDB();
  const user = await authUser();
  const productInfo = await productsModel
    .findOne({ link: params.id })
    .populate("comments", "username score body isAccept createdAt")
    .lean();

  const isExisted = await wishsListModel.findOne({
    user: user?._id,
    product: productInfo?._id,
  });

  const sameProducts = await productsModel.find({ smell: productInfo.smell });

  return (
    <div className={styles.container}>
      <Navbar />
      <div data-aos="fade-up" className={styles.contents}>
        <div className={styles.main}>
          <Details
            userId={JSON.parse(JSON.stringify(user?._id ?? false))}
            isWish={!!isExisted}
            product={JSON.parse(JSON.stringify(productInfo))}
          />
          <Gallery title={productInfo.title} images={JSON.parse(JSON.stringify(productInfo.images))} />
        </div>
        <Tabs
          product={JSON.parse(JSON.stringify(productInfo))}
          userId={JSON.parse(JSON.stringify(user._id ?? false))}
        />
        <div className={styles.same}>
        <MoreProducts
          currProduct={JSON.parse(JSON.stringify(productInfo._id))}
          same={JSON.parse(JSON.stringify(sameProducts))}
        />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default product;
