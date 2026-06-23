import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Comment from "@/components/templates/articles/comment/Comment";
import Details from "@/components/templates/articles/details/Details";
import styles from "@/styles/article.module.css";

import React from "react";

function page() {
  return (
    <>
      <Navbar />
      <Breadcrumb route="روش تهیه قهوه با شیر" />
      <div className={styles.container}>
        <Details />
        <Comment />
      </div>

      <Footer />
    </>
  );
}

export default page;
