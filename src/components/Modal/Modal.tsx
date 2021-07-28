import styles from "./modal.module.scss";

interface ModalPropTypes {
  text: string;
  onClose: () => void;
}

const Modal = ({ text, onClose }: ModalPropTypes) => (
  <div className={styles.wrapper}>
    <div className={styles.content}>
      <span className={styles.icon} onClick={onClose}>
        x
      </span>
      <span>{text}</span>
    </div>
  </div>
);

export default Modal;
