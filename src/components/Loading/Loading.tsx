import LoadingImg from "../../assets/images/loading.svg";
import styles from "./loading.module.scss";

const Loading = () => (
  <div data-testid='loading' className={styles.wrapper}>
    <img src={LoadingImg} alt="Loading" />
  </div>
);

export default Loading;
