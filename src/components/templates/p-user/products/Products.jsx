import React from "react";
import styles from "@/styles/p-user/wishlist.module.css";
import Product from "@/components/templates/p-user/wishlist/Product";
function Products({ wishlist }) {
  return (
    <div className={styles.container}>
      {wishlist.length > 0 &&
        wishlist.map((wish) => (
          <Product
            key={wish._id}
            productID={String(wish.product._id)}
            title={wish.product.title}
            price={wish.product.price}
            score={wish.product.score}
            image={wish.product.images[0]}
            link={wish.product.link}
          />
        ))}
    </div>
  );
}

export default Products;
