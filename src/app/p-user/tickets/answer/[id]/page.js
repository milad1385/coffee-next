import Layout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/answerTicket.module.css";
import Link from "next/link";
import Answer from "@/components/templates/p-user/tickets/Answer";
import connectToDB from "@/configs/db";
import TicketModel from "@/models/Ticket";
import SendAnswer from "@/components/templates/p-admin/tickets/sendAnswer/SendAnswer";

const page = async ({ params }) => {
  connectToDB();
  const ticket = await TicketModel.findOne({ _id: params.id })
    .populate("user", "name role image")
    .lean();
  const answerTicket = await TicketModel.find({ replyTo: ticket._id })
    .populate("user", "name role image")
    .lean();

  return (
    <Layout>
      <main className={styles.container}>
        <h1 className={styles.title}>
          <span>{ticket.title}</span>
          <Link href="/p-user/tickets/sendTicket">ارسال تیکت جدید</Link>
        </h1>

        <div>
          <Answer type="user" answerTicket={ticket} />
          {answerTicket &&
            answerTicket.map((answer) => (
              <Answer
                key={answer._id}
                type={answer.isFromUserPanel ? "user" : "admin"}
                answerTicket={answer}
              />
            ))}

          {answerTicket.length === 0 && (
            <div className={styles.empty}>
              <p>هنوز پاسخی دریافت نکردید</p>
            </div>
          )}
        </div>
        <div>
          {ticket.isOpen ? (
            <div>
              <SendAnswer
                ticket={JSON.parse(JSON.stringify(ticket))}
                adminPanel={true}
              />
            </div>
          ) : (
            <div className={styles.empty}>
              <p>این تیکت توسط ادمین های سایت بسته شده است 🤐</p>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
};

export default page;
