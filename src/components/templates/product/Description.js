import React from "react";
import styles from "./desc.module.css"
const Description = ({ longDesc }) => {
  return (
    <div>
      <p>توضیحات :</p>
      <hr />
      <p className={styles.content}>{longDesc}</p>
    </div>
  );
};

export default Description;
