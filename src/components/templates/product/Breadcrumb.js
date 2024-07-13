import React from "react";
import styles from "./breadcrumb.module.css";
const Breadcrumb = ({ title, isMobile }) => {
  return (
    <section className={isMobile ? styles.mobileBread : styles.breadcrumb}>
      <a href="/">خانه </a>
      <span>/</span>
      <a href="/">همه موارد </a>
      <span>/</span>
      <p>{title}</p>
    </section>
  );
};

export default Breadcrumb;
