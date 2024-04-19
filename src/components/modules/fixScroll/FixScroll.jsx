"use client";
import React, { useEffect, useState } from "react";

function FixScroll() {
  const [fixTop, setFixTop] = useState();
  useEffect(() => {
    const fixNavbarToTop = () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 105) {
        setFixTop(true);
      } else {
        setFixTop(false);
      }
    };

    window.addEventListener("scroll", fixNavbarToTop);

    return () => window.removeEventListener("scroll", fixNavbarToTop);
  }, []);
  return fixTop;
}

export default FixScroll;
