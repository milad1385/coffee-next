"use client";
import React from "react";
import styles from "./../comments/table.module.css";
import { useRouter } from "next/navigation";
import { showSwal } from "@/utils/helper";
import swal from "sweetalert";
export default function DataTable({ tickets, title }) {
  const router = useRouter();

  const showTicketBody = (body) => {
    showSwal(body, undefined, "بستن", () => {});
  };

  const answerToTicket = async (ticket) => {
    router.push(`/p-admin/tickets/${ticket._id}`);
  };

  const closeOrOpenTicket = async (ticketID, isOpen) => {
    console.log(isOpen);
    swal({
      title: `آیا از ${isOpen ? "بستن" : "باز کردن"} اطمینان دارید ؟`,
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch(`/api/ticket`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ticketID }),
        });

        if (res.status === 200) {
          showSwal(
            `تیکت با موفقیت ${isOpen ? "بسته" : "باز"} شد`,
            "success",
            "خیلی هم عالی",
            () => {
              router.refresh();
            }
          );
        }
      }
    });
  };

  const banUser = async (email, phone) => {
    swal({
      title: "آیا از بن اطمینان دارید ؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch(`/api/user/ban`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phone, email }),
        });

        if (res.status === 201) {
          showSwal("کاربر با موفقیت بن شد", "success", "خیلی هم عالی", () => {
            router.refresh();
          });
        }
      }
    });
  };

  return (
    <div className={styles.main_container}>
      <div>
        <h1 className={styles.title}>
          <span>{title}</span>
        </h1>
      </div>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>کاربر</th>
              <th>عنوان</th>
              <th>دپارتمان</th>
              <th>مشاهده</th>
              <th>پاسخ</th>
              <th>بن</th>
              <th>وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket._id}>
                <td className={ticket.isOpen ? styles.open : styles.close}>
                  {(index + 1).toLocaleString('fa')}
                </td>
                <td>{ticket.user.name}</td>
                <td>{ticket.title}</td>
                <td>{ticket.department.title}</td>
                <td>
                  <button
                    type="button"
                    className={styles.edit_btn}
                    onClick={() => showTicketBody(ticket.body)}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.delete_btn}
                    onClick={() => answerToTicket(ticket)}
                  >
                    پاسخ
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.delete_btn}
                    onClick={() =>
                      banUser(ticket.user.email, ticket.user.phone)
                    }
                  >
                    بن
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={styles.delete_btn}
                    onClick={() => closeOrOpenTicket(ticket._id, ticket.isOpen)}
                  >
                    {ticket.isOpen ? "بستن" : "باز کردن"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
