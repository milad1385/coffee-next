import Layout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/index.module.css";
import Box from "@/components/templates/p-user/index/Box";
import Tickets from "@/components/templates/p-user/index/Tickets";
import ticketesModel from "@/models/Ticket";
import commentsModel from "@/models/Comment";
import wishListsModel from "@/models/Wishlist";
import Orders from "@/components/templates/p-user/index/Orders";
import { authUser } from "@/utils/serverHelper";
import { cookies } from "next/headers";
const page = async () => {
  const user = await authUser();

  const tickets = await ticketesModel
    .find({ user: user._id, isAnswer: false })
    .limit(3)
    .sort({ _id: -1 })
    .populate("department");

  const allTickets = await ticketesModel.find({
    user: user._id,
    isAnswer: false,
  });
  const comments = await commentsModel.find({ user: user._id });
  const wishList = await wishListsModel.find({ user: user._id });
  return (
    <Layout>
      <main>
        <section className={styles.boxes}>
          <Box title="مجموع تیکت ها " value={allTickets.length} />
          <Box title="مجموع کامنت ها " value={comments.length} />
          <Box title="مجموع سفارشات" value="2" />
          <Box title="مجموع علاقه مندی ها" value={wishList.length} />
        </section>
        <section className={styles.contents}>
          <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
          <Orders />
        </section>
      </main>
    </Layout>
  );
};

export default page;
