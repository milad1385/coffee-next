import Link from "next/link";
import styles from "./product.module.css";
import { FaRegStar, FaStar } from "react-icons/fa";
import { CiSearch, CiHeart } from "react-icons/ci";
import Image from "next/image";
const Card = ({ productInfo = {} }) => {

  return (
    <div className={styles.card}>
      <div className={styles.details_container}>
        <Image
          src={
            productInfo.images.length
              ? productInfo.images[0]
              : `https://set-coffee.com/wp-content/uploads/2021/10/041-430x430.png`
          }
          width={500}
          height={300}
          alt=""
        />
        <div className={styles.icons}>
          <Link href="/">
            <CiSearch />
            <p className={styles.tooltip}>مشاهده سریع</p>
          </Link>
          <div>
            <CiHeart />
            <p className={styles.tooltip}>افزودن به علاقه مندی ها </p>
          </div>
        </div>
        <button>افزودن به سبد خرید</button>
      </div>

      <div className={styles.details}>
        <Link href={`/product/${productInfo.link}`}>{productInfo.title}</Link>
        <div>
          {new Array(productInfo.score).fill(0).map((score, index) => (
            <FaStar key={index} />
          ))}
          {new Array(5 - productInfo.score).fill(0).map((score, index) => (
            <FaRegStar key={index} />
          ))}
        </div>
        <span>{productInfo.price.toLocaleString("fa")} تومان</span>
      </div>
    </div>
  );
};

export default Card;
