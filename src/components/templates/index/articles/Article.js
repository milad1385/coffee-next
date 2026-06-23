import { MdOutlineSms } from "react-icons/md";
import styles from "./article.module.css";
import { IoShareSocialOutline } from "react-icons/io5";
import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPinterest,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";
import Image from "next/image";

const Card = () => {
  return (
    <div className={styles.card}>
      <Link className={styles.img_container} href={"/blog/123"}>
        <Image
          src="/images/articles/blog-1.png"
          alt="article1"
          width={1920}
          height={1080}
        />
      </Link>
      <div className={styles.date}>
        <span>2</span>
        <span>تیر</span>
      </div>
      <div className={styles.details}>
        <span className={styles.tag}>قهوه</span>
        <Link href={"/blog/123"} className={styles.title}>
          روش تهیه قهوه با شیر
        </Link>
        <div>
          <p>نویسنده</p>
          <Image
            src="/uploads/user.png"
            alt=""
            width={1920}
            height={1080}
            className={styles.avatar}
          />
          <p>محمد اکبری</p>
          <div>
            <MdOutlineSms />
            <span>0</span>
          </div>
          <div className={styles.share}>
            <IoShareSocialOutline />
            <div className={styles.tooltip}>
              <Link href={"/"}>
                <FaTelegram />
              </Link>
              <Link href={"/"}>
                <FaLinkedinIn />
              </Link>
              <Link href={"/"}>
                <FaPinterest />
              </Link>
              <Link href={"/"}>
                <FaTwitter />
              </Link>
              <Link href={"/"}>
                <FaFacebookF />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
