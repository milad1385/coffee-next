"use client";
import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import styles from "./Modal.module.css";
const ModalContext = createContext();

function Modal({ children }) {
  const [name, setName] = useState("");
  const close = () => setName("");
  const open = setName;
  return (
    <ModalContext.Provider value={{ close, open, name }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ name, children }) {
  const { open } = useContext(ModalContext);
  return <>{cloneElement(children, { onClick: () => open(name) })}</>;
}

function Window({ name: modalName, children }) {
  const { name, close } = useContext(ModalContext);

  if (modalName !== name) return null;

  return (
    <div className={styles.modal_container}>
      <div className={styles.modal}>
        {cloneElement(children, { onClose: close })}
      </div>
      <div className={styles.overlay} onClick={close}></div>
    </div>
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
