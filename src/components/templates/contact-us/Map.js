"use client";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
import styles from "./map.module.css";

export default function Map({ position, center, children }) {
  return (
    <>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25913.27309335558!2d50.95522503476561!3d35.7223046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8d9478a50769f3%3A0x23476835bc10926!2sFardis%2C%20Tehran%20Province%2C%20Iran!5e0!3m2!1sen!2s!4v1712078320470!5m2!1sen!2s"
        width="600"
        height="450"
        style={{ border: "0" }}
      ></iframe>
      <div className={styles.details}>{children}</div>
    </>
  );
}
