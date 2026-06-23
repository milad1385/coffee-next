import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Navbar from "@/components/modules/navbar/Navbar";
import React from "react";

function page() {
  return (
    <div>
      <Navbar />
      <Breadcrumb route="لیست مقالات" />
    </div>
  );
}

export default page;
