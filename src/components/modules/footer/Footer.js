import styles from "./footer.module.css";
import { MdOutlineCopyright } from "react-icons/md";

import { FaEnvelope, FaLaptop, FaMap, FaRegHeart } from "react-icons/fa";
import Article from "./Article";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <main className="container">
        <section className={styles.descriptions}>
          <img src="/images/logo_light.png" alt="" />
          <p className={styles.descriptions_title}>
            شرکت فنجان داغ ، فروشگاه اینترنتی قهوه ست
          </p>

          <div className={styles.description}>
            <FaMap style={{ fontSize: "2rem" }} />
            <p>کرج ، عظیمیه بعد از میدان اسبی</p>
          </div>
          <div className={styles.description}>
            <FaLaptop />
            <p>پیگیری سفارشات : 02188305827</p>
          </div>
          <div className={styles.description}>
            <FaEnvelope />
            <p>set-coffee.com</p>
          </div>
        </section>

        <section>
          <h4 className={styles.articles}>جدیدترین نوشته ها</h4>
          <Article
            href={"/article/123"}
            data="۱۷ آبان ۱۴۰۲ "
            comments="بدون دیدگاه"
            img="/images/articles/blog-1.png"
            title="افزایش انرژی با پودر قهوه فوری"
          />

          <hr />

          <Article
            href={"/article/123"}
            data="۱۷ آبان ۱۴۰۲ "
            comments="بدون دیدگاه"
            img="/images/articles/blog-2.png"
            title="افزایش انرژی با پودر قهوه فوری"
          />
        </section>

        <ul className={styles.links}>
          <div>
            <h4>منوی فوتر</h4>
            <li>
              <Link href={"/contact-us"}>تماس با ما</Link>
            </li>
            <li>
              <Link href={"/about-us"}>درباره ما </Link>
            </li>
            <li>
              <Link href={"/rules"}>قوانین</Link>
            </li>
          </div>
          <div>
            <h4>دسترسی سریع</h4>
            <li>
              <Link href={"/product"}> فروشگاه </Link>
            </li>
            <li>
              <Link href={"/blog"}> مقالات </Link>
            </li>
            <li>
              <Link href={"/cart"}>سبد خرید</Link>
            </li>
            <li>
              <Link href={"/wishlist"}>علاقه مندی ها</Link>
            </li>
          </div>
        </ul>
        <div className={styles.licenses}>
          <img src="/images/license4.htm" width={76} height={76} alt="" />
          <img src="/images/license1.png" width={85} height={85} alt="" />
          <img src="/images/license3.png" alt="" />
          <img src="/images/license2.svg" width={62} height={95} alt="" />
        </div>
      </main>
      <hr />
      <div className={`container ${styles.copy}`}>
        <p className={styles.copyRight}>
          تمام حقوق متعلق است به{" "}
          <strong>میلاد سلامیان</strong> است
          <MdOutlineCopyright className={styles.copyRightIcon} />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
