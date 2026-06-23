import Link from "next/link";
import {
  FaAngleLeft,
  FaAngleRight,
  FaFacebookF,
  FaLinkedinIn,
  FaPinterest,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";
import { IoGridOutline } from "react-icons/io5";
import styles from "./details.module.css";

import React from "react";
import Image from "next/image";

function Details() {
  return (
    <>
      <p className={styles.tag}>قهوه</p>
      <p className={styles.title}>
        روش تهیه قهوه با شیر چگونه است ؟ و چطور می شود تهیه کرد
      </p>
      <div className={styles.author}>
        <p>نویسنده</p>
        <Image
          src="/uploads/user.png"
          alt=""
          width={1920}
          height={1080}
          className={styles.avatar}
        />
        <p>محمد اکبری</p>
      </div>

      <div className={styles.main_img}>
        <div class={styles.date}>
          <span>2</span>
          <span>تیر</span>
        </div>
        <Image
          src="/images/articles/blog-1.png"
          alt="article1"
          width={1920}
          height={1080}
          className={styles.mainImageArticle}
        />
      </div>
      <section className={styles.sectionParagraph}>
        <p>
          تحقیقات جدید حاکی از آن است که در واقع خود تجربه نوشیدن قهوه موجب
          هوشیاری و کارایی بیشتر ذهن می شود نه فقط کافئین موجود در آن. محققان با
          این فرضیه که «قهوه ضرروی برای صبحانه» که میلیاردها نفر در سراسر جهان
          از آن لذت می برند ممکن است دارونما باشد، روی افرادی که به طور منظم
          قهوه می نوشند، MRI انجام دادند تا فعالیت عملکردی مغز آنها را ارزیابی
          کنند.
        </p>
        <p>
          تیم تحقیقاتی مستقر در پرتغال از شرکت کنندگان در این تحقیق، خواست تا
          قبل از انجام MRI از مصرف قهوه یا کافئین خودداری کنند. به یک گروه از
          شرکت کنندگان، کافئین به شکل شیمیایی ساده داده شد در حالی که به گروه
          دیگر یک فنجان قهوه کافئین دار تقریبا شبیه قهوه ای که هر روز نوشیدن آن
          را تجربه می کنند، داده شد. سپس از شرکت کنندگان خواسته شد هنگام انجام
          اسکن ام آر آی آرام باشند و اجازه دهند ذهنشان آزادانه فکر کند.
        </p>
        <p>
          اسکن‌ها نشان دادند که فعالیت در شبکه حالت پیش‌فرض مغز (DMN) – که با
          درونگرایی و خویشتن اندیشی مرتبط است، در هر دو گروه از شرکت‌کنندگان
          کاهش یافت و در عین حال، پاسخ به محرک‌های خارجی افرایش یافت. این نتایج،
          نشان می دهد که مصرف کافئین یا یک فنجان قهوه “افراد را برای تغییر وضعیت
          از حالت استراحت به انجام وظایف آماده تر می کند.”
        </p>
        <p>
          البته،MRI یک تمایز قابل توجه را نیز بین دو گروه نشان داد. در افرادی که
          یک فنجان قهوه نوشیده بودند، ارتباط شبکه عصبی بین «شبکه بصری بالاتر-
          higher visual network » و «شبکه کنترل اجرایی صحیح- right executive
          control network » دیده شد. این شبکه ها، بخش‌هایی از مغز هستند که با
          حافظه فعال، کنترل شناختی و رفتار هدف‌دار مرتبط هستند.
        </p>
        <p>
          اما گروهی که بدون تجربه نوشیدن قهوه صرفا کافئین مصرف کرده بودند، این
          افزایش در فعالیت عصبی را تجربه نکرده بودند.
        </p>
      </section>

      <div className={styles.contents}>
        <div className={styles.icons}>
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
        <div className={styles.more_articles}>
          <div className={styles.prev_article}>
            <Link href={"/article/134"} className={styles.icon}>
              <FaAngleLeft />
            </Link>
            <div>
              <p>قدیمی تر</p>
              <Link href={"/article/134"}>مصرف قهوه با شیر</Link>
            </div>
          </div>
          <Link className={styles.link} href={"/articles"}>
            <IoGridOutline />
          </Link>

          <div className={styles.next_article}>
            <Link href={"/article/134"} className={styles.icon}>
              <FaAngleRight />
            </Link>
            <div>
              <p>جدید تر</p>
              <Link href={"/article/134"}>معایب و مزایا نوشیدن قهوه</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Details;
