import { FC, useEffect, useState } from "react";
import styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";

interface TodoProps {
  id: string;
  text: string;
  repository: string;
  isChecked: boolean;
  time: string;
  deletTodo: (id: string) => void;
  doneTodo: (id: string) => void;
  changeTextTodo: (id:string, text:string) => void
}

export const Todo: FC<TodoProps> = ({
  id,
  text,
  repository,
  isChecked,
  time,
  deletTodo,
  doneTodo,
  changeTextTodo
}) => {
  const [newText, setNewText] = useState(text);
  const [steteEdit, setStateEdit] = useState(false);
// <div className={steteEdit ? styles.editTodo : styles.editTodoClose}>
  return (
    <div className={isChecked ? styles.mainDivDone : styles.mainDiv}>
      <div className={styles.infoDiv}>
        <input
          type="checkbox"
          defaultChecked={isChecked}
          onChange={() => doneTodo(id)}
        ></input>
        <p className={styles.text}>{newText}</p>
        <p className={styles.time}>{time}</p>
        <button onClick={() => setStateEdit(true)}>
          <FontAwesomeIcon icon={faPen} />
        </button>

        <button onClick={() => deletTodo(id)}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
      <p className={styles.repositoryInfo}>repository: {repository}</p>

      <div className={steteEdit ? styles.editTodo : styles.editTodoClose}>
        <form action=""
        onSubmit={(e) => {
         e.preventDefault()}}
        >
        <input
          className={styles.editTodoInput}
          type="text"
          value={newText}
          onChange={(e) => {
            setNewText(e.target.value);
            changeTextTodo(id, e.target.value)
          }}
        ></input>

        </form>
        <button type="submit" onClick={() => setStateEdit(false)}>
          X
        </button>
      </div>
    </div>
  );
};
