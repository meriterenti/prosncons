import { useState } from "react";
import { HandleChangeProps, TypeEnum, ActionEnum } from "../../main.d";
import constants from "../../../../constants"
import styles from "./list.module.scss";

interface ListPropTypes {
  type: TypeEnum;
  title: string;
  data?: string[];
  handleChange: ({ type, action, value }: HandleChangeProps) => void;
}

const List = ({ type, title, data, handleChange }: ListPropTypes) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>{title}</div>
      <ul className={styles.content}>
        {!!data?.length &&
          data.map((item) => (
            <li key={item} className={styles.item}>
              <span className={styles.text}>{item}</span>
              <span
                className={styles.icon}
                onClick={() =>
                  handleChange({ type, action: ActionEnum.remove, value: item })
                }
              >
                x
              </span>
            </li>
          ))}
      </ul>
      <div className={styles.footer}>
        <input
          type="text"
          placeholder={`${constants.lng.new} ${title}`}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <span
          className={styles.icon}
          onClick={() =>
            handleChange({ type, action: ActionEnum.add, value: inputValue })
          }
        >
          +
        </span>
      </div>
    </div>
  );
};

export default List;
