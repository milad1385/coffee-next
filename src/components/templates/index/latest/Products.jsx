import React from "react";
import Product from "@/components/modules/product/Product";
function Products({ products }) {
  return (
    <>
      {products.map((product) => (
        <Product productInfo={product} key={product._id} />
      ))}
    </>
  );
}

export default Products;
