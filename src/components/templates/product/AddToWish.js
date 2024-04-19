"use client";
import React from "react";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { showSwal } from "@/utils/helper";
import { useRouter } from "next/navigation";
function Wish({ isWish, product, user }) {
  const router = useRouter();
  const addToWishList = async () => {
    console.log(user , product);
    const res = await fetch(`/api/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, product }),
    });

    if (res.status === 201) {
      showSwal(
        "محصول به علاقه مندی ها اضافه شد",
        "success",
        "خیلی هم عالی",
        () => {
          router.refresh();
        }
      );
    }
  };
  return (
    <>
      {isWish ? (
        <>
          <FaHeart style={{ color: "red" }} />
          <span style={{ cursor: "pointer" }}>قبلا افزوده شده</span>
        </>
      ) : (
        <div onClick={addToWishList}>
          <CiHeart />
          <span style={{ cursor: "pointer" }}>افزودن به علاقه مندی ها</span>
        </div>
      )}
    </>
  );
}

export default Wish;
