import Link from "next/link";
import styles from "./order.module.css";

const Order = () => {
  return (
    <Link href={`/product/123`} className={styles.card}>
      <div>
        <div>
          <p className={styles.orderTitle}>سفارش 46565#</p>
        </div>
        <p className={styles.deliver}>تکمیل شده</p>
      </div>
      <div>
        <p className={styles.orderTime}>8:00 1405/4/21</p>
        <p className={styles.price}>200000 هزار تومان</p>
      </div>
    </Link>
  );
};

export default Order;
