import styles from "./answer.module.css";

const Answer = ({ answerTicket , type , user }) => {
  
  return (
    <section
      className={type == "user" ? styles.userTicket : styles.adminticket}
    >
      <div className={styles.ticket_main}>
        <p>{new Date(answerTicket.createdAt).toLocaleDateString("fa-IR")} </p>
        <div>
          <div>
            <p>{answerTicket.user.name}</p>
            <span>{answerTicket.user.role === "ADMIN" ? "ادمین" : "کاربر"}</span>
          </div>
          <img src={answerTicket.user.image} alt={type} />
        </div>
      </div>
      <div className={styles.ticket_text}>
        <p>{answerTicket.body}</p>
      </div>
    </section>
  );
};

export default Answer;
