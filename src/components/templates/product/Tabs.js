"use client";
import React from "react";
import styles from "./tabs.module.css";
import { useState } from "react";
import Description from "./Description";
import MoreInfoes from "./MoreInfoes";
import Comments from "./Comments";
const Tabs = ({ product , userId }) => {
  const [tab, setTab] = useState("description");

  return (
    <>
      <div data-aos="fade-left" className={styles.tabs}>
        <ul>
          <li>
            <button
              className={tab === "description" ? styles.active_tab : ""}
              onClick={() => setTab("description")}
            >
              توضیحات
            </button>
          </li>
          <li>
            <button
              className={tab === "moreInfoes" ? styles.active_tab : ""}
              onClick={() => setTab("moreInfoes")}
            >
              اطلاعات بیشتر
            </button>
          </li>
          <li>
            <button
              className={tab === "comments" ? styles.active_tab : ""}
              onClick={() => setTab("comments")}
            >
              نظرات (
              {product.comments.filter((comment) => comment.isAccept).length})
            </button>
          </li>
        </ul>

        <div className={styles.contents}>
          <section>
            {tab === "description" && (
              <Description longDesc={product.longDesc} />
            )}
            {tab == "moreInfoes" && <MoreInfoes product={product} />}
            {tab == "comments" && (
              <Comments
                productName={product.title}
                comments={product.comments}
                productId={product._id}
                userId={userId}
              />
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default Tabs;
