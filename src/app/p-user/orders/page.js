import Layout from "@/components/layouts/UserPanelLayout";
import OrdersData from "@/components/templates/p-user/orders/OrdersData";
import styles from "@/styles/p-user/orders.module.css";

const page = () => {
  return (
    <Layout>
      <main className={styles.main_container}>
        <OrdersData title="لیست سفارش ها" />
        {/* <p className={tableStyles.empty}>
          سفارشی وجود ندارد
        </p> */}
      </main>
    </Layout>
  );
};

export default page;
