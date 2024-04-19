"use client";
import React, { useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import styles from "./topbar.module.css";

function Notification() {
  const [showNotifications, setShowNotifications] = useState(false);
  return (
    <div>
      <div
        onClick={() => setShowNotifications(true)}
        className={styles.notification}
      >
        <IoIosNotifications />
        <span>0</span>
      </div>

      {showNotifications && (
        <div>
          <div
            onClick={() => setShowNotifications(false)}
            className={styles.notifications_overlay}
          ></div>
          <section className={styles.notifications_box}>
            <div>
              <p
                onClick={() => {
                  setShowNotifications(false);
                  setShowModal(true);
                }}
              >
                سلام ادمین محترم
              </p>
              <button onClick={() => setShowNotifications(false)}>دیدم</button>
            </div>
            <div>
              <p
                onClick={() => {
                  setShowNotifications(false);
                  setShowModal(true);
                }}
              >
                سلام ادمین محترم
              </p>
              <button onClick={() => setShowNotifications(false)}>دیدم</button>
            </div>

            {/* if we dont have any notif we show : */}
            {/* <div>
              <span>پیفامی وجود ندارد</span>
              <IoClose onClick={() => setShowNotifications(false)}/>
            </div> */}
          </section>
        </div>
      )}
    </div>
  );
}

export default Notification;
