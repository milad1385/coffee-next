"use client";
import React, { useState } from "react";
import styles from "./sendAnswer.module.css";
import { showSwal } from "@/utils/helper";
import { useRouter } from "next/navigation";
function SendAnswer({ ticket, adminPanel }) {
  const router = useRouter();
  const [body, setBody] = useState("");

  const sendAnswer = async () => {
    if (body.length < 5) return false;
    const ticketInfo = {
      ...ticket,
      body,
      replyTo: ticket._id,
      isFromUserPanel: adminPanel ? false : true,
    };
    const res = await fetch(`/api/ticket/answer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketInfo),
    });

    if (res.status === 201) {
      showSwal("پاسخ با موفقیت ارسال شد", "success", "خیلی هم عالی", () => {
        router.refresh();
       
      });
    }
  };
  return (
    <div className={styles.container}>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className={styles.text_area}
        placeholder="پاسخ خود را وارد کنید"
      ></textarea>
      <button className={styles.button} onClick={sendAnswer}>
        ارسال پاسخ
      </button>
    </div>
  );
}

export default SendAnswer;
