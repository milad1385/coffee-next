"use client";
import styles from "@/styles/login-register.module.css";
import { useEffect, useState } from "react";
import { authTypes } from "@/utils/constants";
import { useRouter } from "next/navigation";
import Login from "@/components/templates/login-register/Login";
import Register from "@/components/templates/login-register/Register";
import Image from "next/image";

const login_register = () => {
  const router = useRouter();
  const [authType, setAuthType] = useState(authTypes.LOGIN);

  const showRegisterForm = () => setAuthType(authTypes.REGISTER);
  const showloginForm = () => setAuthType(authTypes.LOGIN);
  useEffect(() => {
    const getUserInfo = async () => {
      const res = await fetch(`/api/auth/me`);
      const user = await res.json();

      if (res.status === 200) {
        router.replace("/");
      }
    };

    getUserInfo();
  }, []);

  return (
    <div className={styles.login_register}>
      <div className={styles.form_bg} data-aos="fade-up">
        {authType === authTypes.LOGIN ? (
          <Login showRegisterForm={showRegisterForm} />
        ) : (
          <Register showloginForm={showloginForm} />
        )}
      </div>
      <section className={styles.login_image}>
        <Image
          src="/images/loginImage.webp"
          width={900}
          height={450}
          alt="login-register image"
        />
      </section>
    </div>
  );
};

export default login_register;
