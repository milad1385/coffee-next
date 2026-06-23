import {
  FaEnvelopeOpenText,
  FaInternetExplorer,
  FaPhone,
  FaTelegramPlane,
} from "react-icons/fa";
import styles from "./information.module.css";
import { PiCoffeeFill } from "react-icons/pi";
import { BiSolidContact } from "react-icons/bi";

const Information = () => {
  return (
    <section className={styles.Information}>
      <span>تماس با ما</span>
      <p className={styles.infoTitle}>اطلاعات تماس</p>

      <div className={styles.infoBox}>
        <PiCoffeeFill />
        <p>شرکت فنجان داغ (کارخانه قهوه ست )</p>
      </div>
      <div className={styles.infoBox}>
        <FaInternetExplorer />
        <p>coffeeset.vercel.app</p>
      </div>
      <div className={styles.infoBox}>
        <BiSolidContact />
        <p>استان تهران ، شهر تهران بعد از میدان آزادی</p>
      </div>
      <div className={styles.infoBox}>
        <FaPhone />
        <p>021-32144567</p>
      </div>
      <div className={styles.infoBox}>
        <FaEnvelopeOpenText />
        <p>offee[at]set-coffee.com</p>
      </div>
      <div className={styles.infoBox}>
        <FaEnvelopeOpenText />
        <p>whole[at]set-coffee.com</p>
      </div>
      <div className={styles.infoBox}>
        <FaTelegramPlane />
        <p>تماس از طریق تلگرام : 09121234567</p>
      </div>
    </section>
  );
};

export default Information;
