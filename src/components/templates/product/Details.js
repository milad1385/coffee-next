"use client";
import {
  FaFacebookF,
  FaRegStar,
  FaStar,
  FaTrash,
  FaTwitter,
} from "react-icons/fa";
import { IoCheckmark } from "react-icons/io5";
import { TbSwitch3 } from "react-icons/tb";
import { FaTelegram, FaLinkedinIn, FaPinterest } from "react-icons/fa";
import styles from "./details.module.css";
import Breadcrumb from "./Breadcrumb";
import { FaXmark } from "react-icons/fa6";
import Wish from "./AddToWish";
import { useEffect, useState } from "react";
import { getLocalStorage, setToLocalStorage, showSwal } from "@/utils/helper";
import { useCardContext } from "@/context/CardContext";

const Details = ({ product, isWish, userId }) => {
  const { state, dispatch } = useCardContext();
  const [count, setCount] = useState(() => {
    const ISSERVER = typeof window === "undefined";
    const basket = !ISSERVER
      ? JSON.parse(localStorage.getItem("basket")) || []
      : null;
    const productInfo = basket?.find((pro) => pro.id === product._id);
    return productInfo?.count ?? 0;
  });
  const [isExist, setIsExist] = useState(false);

  const addToBasket = () => {
    const newProduct = {
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      count: 1,
      score: product.score,
    };

    dispatch({ type: "ADD_CARD", payload: newProduct });
    setCount(1);
  };

  const decreaseCount = () => {
    if (count !== 1) {
      setCount((prev) => prev - 1);
    }
  };

  const increaseCount = () => {
    if (count !== product.count) {
      setCount((prev) => prev + 1);
    }
  };

  const deleteHandler = (id) => {
    dispatch({ type: "REMOVE", payload: { id } });
    setIsExist(false);
    setCount(0);
  };

  useEffect(() => {
    const basket = getLocalStorage("basket") || [];
    const isExistProduct = basket.some((pro) => pro.id === product._id);
    setIsExist(isExistProduct);
    const newPro = basket.map((pro) => {
      if (pro.id === product._id) {
        pro.count = count;
      }
      return pro;
    });
    setToLocalStorage(newPro, "basket");
  }, [count]);

  return (
    <main className={styles.right}>
      <Breadcrumb title={product.title} />
      <h2>{product.title}</h2>

      <div className={styles.rating}>
        <div>
          {new Array(Math.ceil(product.score)).fill(0).map((score, index) => (
            <FaStar key={index} />
          ))}

          {new Array(5 - Math.ceil(product.score))
            .fill(0)
            .map((score, index) => (
              <FaRegStar key={index} />
            ))}
        </div>
        <p>
          (دیدگاه{" "}
          {product.comments.filter((comment) => comment.isAccept).length} کاربر)
        </p>
      </div>

      <p className={styles.price}>{product.price.toLocaleString("fa")} تومان</p>
      <span className={styles.description}>{product.shortDesc}</span>

      <hr />

      <div className={styles.Available}>
        {product.count ? <IoCheckmark /> : <FaXmark />}
        <p>{product.count ? "موجود در انبار" : "ناموجود"}</p>
      </div>

      <div className={styles.cart}>
        {!isExist && <button onClick={addToBasket}>افزودن به سبد خرید</button>}
        <div className={styles.card_action}>
          {isExist && count > 1 && (
            <span className={styles.decrease} onClick={decreaseCount}>
              -
            </span>
          )}
          {isExist && count === 1 && (
            <span
              className={styles.delete}
              onClick={() => deleteHandler(product._id)}
            >
              <FaTrash />
            </span>
          )}

          {isExist && <div className={styles.counter}>{count}</div>}
          {count >= 1 && (
            <span className={styles.increase} onClick={increaseCount}>
              +
            </span>
          )}
        </div>
      </div>

      <section className={styles.wishlist}>
        <div>
          {userId && (
            <Wish isWish={isWish} product={product._id} user={userId} />
          )}
        </div>
        <div>
          <TbSwitch3 />
          <span style={{ cursor: "pointer" }}>مقایسه</span>
        </div>
      </section>

      <hr />

      <div className={styles.details}>
        <strong>شناسه محصول: {product.link}</strong>
        <p>
          {" "}
          <strong>دسته:</strong> Coffee Capsule, کپسول قهوه, همه موارد
        </p>
        <p>
          <strong>برچسب:</strong>
          {product.tags.join(" , ")}
        </p>
      </div>

      <div className={styles.share}>
        <p>به اشتراک گذاری: </p>
        <a href="/">
          <FaTelegram />
        </a>
        <a href="/">
          <FaLinkedinIn />
        </a>
        <a href="/">
          <FaPinterest />
        </a>
        <a href="/">
          <FaTwitter />
        </a>
        <a href="/">
          <FaFacebookF />
        </a>
      </div>

      <hr />
    </main>
  );
};

export default Details;
