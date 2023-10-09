import { FC, useState } from "react";
import { getRandomID } from "../App/App";
import { TodoItem } from "../App/App";
import styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { Repository } from "../AddRepository";

interface AddTodoProps {
  NewTodo: (todo: TodoItem) => void;
  getArr: Repository[];
}

export const AddTodo: FC<AddTodoProps> = ({ NewTodo, getArr }) => {
  const [textTodo, setTextTodo] = useState("");
  const [timeTodo, setTimeTodo] = useState("");

  const [repositoryName, setRepositoryName] = useState('');

  const addNewTodo: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!textTodo) return;

    const todo = {
      time: timeTodo.split("-").reverse().join("."),
      id: getRandomID(),
      text: textTodo,
      repository: repositoryName ? repositoryName : 'Todo',
      isChecked: false,
    };

    NewTodo(todo);
    setTextTodo("");
  };

 // console.log(repositoryName);
  return (
    <form
      className={styles.addForm}
      action=""
      onSubmit={(event) => addNewTodo(event)}
    >
      <input
        className={styles.formText}
        type="text"
        placeholder="Write your plans"
        onChange={(event) => setTextTodo(event.target.value)}
        value={textTodo}
      ></input>
      <input
        type="date"
        className={styles.time}
        onChange={(event) => setTimeTodo(event.target.value)}
        value={timeTodo}
      ></input>
      <select
        className={styles.select}
        value={repositoryName}
       //onClick={(event : any)=>setRepositoryName(event.target.value)}
        onChange={(event) => setRepositoryName(event.target.value)}
      >
        {getArr.map(({ name }) => (
          <option
          className={styles.option}
          key={getRandomID()} 
          value={name}
          >{name}</option>
        ))}
      </select>
      <button type="submit" className={styles.customBtn + " " + styles.btn7}>
        <span>
          <FontAwesomeIcon icon={faPenToSquare} />
        </span>
      </button>
    </form>
  );
};
