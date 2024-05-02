import React from "react";
import styles from "./Overlay.module.css";
function Overlay({ isShow, onShow }) {
  return (
    <div
      className={`${styles.Overlay} ${isShow ? styles.show : ""}`}
      onClick={() => onShow(false)}
    ></div>
  );
}

export default Overlay;
