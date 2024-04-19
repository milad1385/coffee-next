import Layout from "@/components/layouts/UserPanelLayout";
import Tickets from "@/components/templates/p-user/tickets/Tickets";
import connectToDB from "@/configs/db";
import ticketsModel from "@/models/Ticket";
import { authUser } from "@/utils/serverHelper";
const page = async () => {
  connectToDB();
  const user = await authUser();
  const tickets = await ticketsModel
    .find({ user: user._id, isAnswer: false })
    .populate("department");

  return (
    <Layout>
      <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
    </Layout>
  );
};

export default page;
