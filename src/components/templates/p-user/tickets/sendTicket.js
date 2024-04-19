"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/p-user/sendTicket.module.css";
import Link from "next/link";
import { IoIosSend } from "react-icons/io";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./ticketSchema";
import { showSwal } from "@/utils/helper";
import { useRouter } from "next/navigation";

function sentTicket() {
  const router = useRouter();
  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState(null);
  const [subDepartments, setSubDepartments] = useState([]);
  const [subId, setSubId] = useState(null);
  const [periority, setPeriority] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    const getDepartments = async () => {
      const res = await fetch(`/api/department`);
      const departments = await res.json();
      if (res.status === 200) {
        setDepartments(departments);
      }
    };

    getDepartments();
  }, []);

  useEffect(() => {
    const getSubDepartments = async () => {
      const res = await fetch(`/api/ticket/sub/${departmentId}`);
      const subDepartments = await res.json();
      if (res.status === 200) {
        setSubDepartments(subDepartments);
      }
    };

    getSubDepartments();
  }, [departmentId]);

  const sendNewTicket = async (data) => {
    const { body, title } = data;
    const res = await fetch(`/api/ticket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
        priority: periority,
        department: departmentId,
        subDepartment: subId,
        isOpen: true,
      }),
    });

    console.log(res);

    if (res.status === 201) {
      showSwal("تیکت با موفقیت ارسال شد", "success", "خیلی هم عالی", () => {
        router.replace("/p-user/tickets");
        router.refresh();
      });
    }

    const result = await res.json();
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit(sendNewTicket)} className={styles.container}>
      <h1 className={styles.title}>
        <span>ارسال تیکت جدید</span>
        <Link href="/p-user/tickets"> همه تیکت ها</Link>
      </h1>

      <div className={styles.content}>
        <div className={styles.group}>
          <label>دپارتمان را انتخاب کنید:</label>
          <select onChange={(e) => setDepartmentId(e.target.value)}>
            <option value={-1}>لطفا دپارتمان را انتخاب نمایید</option>
            {departments.map((department) => (
              <option value={department._id} key={department._id}>
                {department.title}
              </option>
            ))}
          </select>
        </div>
        {subDepartments.length > 0 && (
          <div className={styles.group}>
            <label>نوع تیکت را انتخاب کنید:</label>
            <select value={subId} onChange={(e) => setSubId(e.target.value)}>
              <option value={-1}>لطفا یک مورد را انتخاب نمایید</option>
              {subDepartments.map((sub) => (
                <option value={sub._id} key={sub._id}>
                  {sub.title}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className={styles.group}>
          <label>عنوان تیکت را وارد کنید:</label>
          <div>
            <input placeholder="عنوان.." type="text" {...register("title")} />
            {errors.title && (
              <div className={styles.err_msg}>{errors.title.message}</div>
            )}
          </div>
        </div>
        <div className={styles.group}>
          <label>سطح اولویت تیکت را انتخاب کنید:</label>
          <select
            value={periority}
            onChange={(e) => setPeriority(e.target.value)}
          >
            <option value={-1}>لطفا یک مورد را انتخاب نمایید</option>
            <option value={1}>کم</option>
            <option value={2}>متوسط</option>
            <option value={3}>بالا</option>
          </select>
        </div>
      </div>
      <div className={styles.group}>
        <label>محتوای تیکت را وارد نمایید:</label>
        <div>
          <textarea rows={10} {...register("body")}></textarea>
          {errors.body && (
            <div className={styles.err_msg}>{errors.body.message}</div>
          )}
        </div>
      </div>
      <div className={styles.uploader}>
        <span>حداکثر اندازه: 6 مگابایت</span>
        <span>فرمت‌های مجاز: jpg, png.jpeg, rar, zip</span>
        <input type="file" />
      </div>

      <button className={styles.btn} type="submit">
        <IoIosSend />
        ارسال تیکت
      </button>
    </form>
  );
}

export default sentTicket;
