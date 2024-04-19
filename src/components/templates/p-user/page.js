import Layout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/index.module.css";
import Box from "@/components/templates/p-user/index/Box";
import Tickets from "@/components/templates/p-user/index/Tickets";
import Orders from "@/components/templates/p-user/index/Orders";
import connectToDB from "@/configs/db";
import ticketsModel from "@/models/Ticket";
import { authUser } from "@/utils/serverHelper";
const page = async () => {
  connectToDB();
  const user = await authUser();
  console.log(user);
  const tickets = await ticketsModel
    .find({ user: user._id })
    .limit(3)
    .sort({ id: -1 })
    .populate("department")
    .lean();

  return (
    <Layout>
      <main>
        <section className={styles.boxes}>
          <Box title="مجموع تیکت ها " value="20" />
          <Box title="مجموع کامنت ها " value="0" />
          <Box title="مجموع سفارشات" value="2" />
          <Box title="مجموع علاقه مندی ها" value="10" />
        </section>
        <section className={styles.contents}>
          <Tickets tickets={tickets} />
          <Orders />
        </section>
      </main>
    </Layout>
  );
};

export default page;
