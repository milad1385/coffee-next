"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useCardContext } from "@/context/CardContext";
import { useRouter } from "next/navigation";
function Cart() {
  const router = useRouter();
  const { state, dispatch } = useCardContext();

  useEffect(() => {
    dispatch({ type: "LOAD" });
    router.refresh();
  }, []);
  return (
    <Link href="/cart">
      <FaShoppingCart />
      <span>{state?.basket?.length}</span>
    </Link>
  );
}

export default Cart;
