"use client";
import styles from "./product.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegStar, FaStar } from "react-icons/fa";
import swal from "sweetalert";
const Card = ({ price, score, title, productID, image, link }) => {
  const router = useRouter();
  const removeProduct = () => {
    swal({
      title: "آیا از حذف محصول اطمینان دارید؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch(`/api/wishlist/${productID}`, {
          method: "DELETE",
        });

        if (res.status === 200) {
          swal({
            title: "محصول با موفقیت از علاقه مندی‌ها حذف شد",
            icon: "success",
            buttons: "فهمیدم",
          }).then(() => {
            router.refresh();
          });
        }
      }
    });
  };

  return (
    <div className={styles.card}>
      <Link href={`/product/${link}`}>
        <img width={283} height={283} src={image} alt={image} />
      </Link>
      <p dir="rtl">{title}</p>
      <div>
        <div>
          {new Array(score).fill(0).map((item, index) => (
            <FaStar key={index} />
          ))}
          {new Array(5 - score).fill(0).map((item, index) => (
            <FaRegStar key={index} />
          ))}
        </div>
        <span>{price.toLocaleString()} تومان</span>
      </div>
      <button onClick={removeProduct} className={styles.delete_btn}>
        حذف محصول{" "}
      </button>
    </div>
  );
};

export default Card;
