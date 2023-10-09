import React, { FC, useContext, useEffect } from "react";
import { Todo } from "../Todo";
import { useState } from "react";
import { AddTodo } from "../AddTodo";
import { AddRepository } from "../AddRepository";
import styles from "./App.module.scss";
import { ThemeContext } from "../ThemeContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCircle,
  faClock,
  faMoon,
  faPlus,
  faSun,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Repository } from "../AddRepository";
import { Header } from "../Header";

export interface TodoItem {
  id: string;
  text: string;
  repository: string;
  isChecked: boolean;
  time: string;
}

export const getRandomID = () => {
  const min = 0;
  const max = 1679615;
  let int = Math.floor(Math.random() * (max - min + 1)) + min;
  return int.toString(36);
};

/*
  const makeReposirorys = () => {
    const originalRepositorys = new Set(
      Array.from(todoState, ({ repository }) => repository)
    );
    return Array.from(originalRepositorys);
  };*/

export const App = () => {
  const read = (arg: string) => {
    const data = localStorage.getItem(arg);
    const parsedData = data ? JSON.parse(data) : [];
    return parsedData;
  };

  const readTheme = (arg: string) => {
    const data = localStorage.getItem(arg);
    const parsedData = data ? JSON.parse(data) : ' ';
    return parsedData;
  };
  
  const write = (keyLS: string, arg: TodoItem[] | Repository[] | string) => {
    localStorage.setItem(keyLS, JSON.stringify(arg));
  };

  const [todoState, setTodoState] = useState<TodoItem[]>((): TodoItem[] => {
    return read("todoState");
  });

  const [filteredArr, setFilteredArr] = useState<TodoItem[]>((): TodoItem[] => {
    return read("filteredArr");
  });

  //const [theme, setTheme] = useState('1')
  const [theme, setTheme] = useState((): string => {
    return readTheme("theme");
  })

  const rep: Repository = {
    id: "1111",
    name: "Todo",
    color: "",
  };

  const [repositoryName, setRepositoryName] = useState<Repository[]>(
    (): any => {
      return read("repositoryName");
    }
  );

  useEffect(() => {
    (function () {
      const arr = [...repositoryName];
      arr.length === 0
        ? setRepositoryName([rep])
        : arr.find(
            (el) =>
              el.id === "1111" ?? setRepositoryName([...repositoryName, rep])
          );
    })();
  }, []);

  useEffect(() => {
    write("todoState", todoState);
    write("filteredArr", filteredArr);
    write("repositoryName", repositoryName);
    write("theme", theme)
  }, [todoState, filteredArr, repositoryName, theme]);

  const [filterState, setFilterState] = useState(false);
  const [offOnFilter, setOffOnFilter] = useState(false);
  const [window, setWindow] = useState(false);

  //const newThemeContext = useContext(ThemeContext);

  const addTodo = (newTodo: TodoItem) => {
    setTodoState([...todoState, newTodo]);
    setFilterState(false);
    setOffOnFilter(false);
  };

  const addNewRepository = (arg: Repository) => {
    repositoryName.length !== 0
      ? repositoryName.map((el) => {
          if (el.name === arg.name) setRepositoryName([...repositoryName]);
          else {
            setRepositoryName([...repositoryName, arg]);
          }
        })
      : setRepositoryName([arg]);
  };

  const doneTodo = (idDone: string) => {
    const changeTodo = todoState.find((el) => el.id === idDone);

    changeTodo && (changeTodo.isChecked = !changeTodo.isChecked);
    setTodoState([...todoState]);
  };

  const deletTodo = (idEl: string) => {
    const newArr = todoState.filter((el) => el.id !== idEl);
    clearFilter();
    setTodoState([...newArr]);
  };

  const changeTextTodo = (idEl: string, newText: string) => {
    todoState.map((el) =>
      el.id === idEl ? (el.text = newText) : (el.text = el.text)
    );

    setTodoState([...todoState]);
  };

  const buttonFilter = (buttonName: string, id: string): void => {
    const arr: TodoItem[] = [...todoState];
    const filtedArr = arr.filter((el) => el.repository === buttonName);
    setFilteredArr([...filtedArr]);
    console.log(id)
    setFilterState(true);
  };

  const clearFilter = () => {
    setFilterState(false);
    setOffOnFilter(false);
  };

  const clearTodos = () => {
    setFilterState(false);
    setTodoState([]);
  };

  const timeFilter = () => {
    const arr = [...todoState];
    if (!offOnFilter) {
      arr.sort(
        (a, b): number =>
          Date.parse(a.time.split(".").reverse().join("-")) -
          Date.parse(b.time.split(".").reverse().join("-"))
      );
    } else {
      arr.sort(
        (a, b): number =>
          Date.parse(b.time.split(".").reverse().join("-")) -
          Date.parse(a.time.split(".").reverse().join("-"))
      );
    }
    setOffOnFilter(!offOnFilter);
    setFilterState(true);
    setFilteredArr([...arr]);
  };

  const sortCheck = () => {
    const arr = [...todoState];
    let newArr = [];
    if (!offOnFilter) {
      newArr = arr.filter((el) => el.isChecked);
    } else {
      newArr = arr.filter((el) => !el.isChecked);
    }

    setOffOnFilter(!offOnFilter);
    setFilterState(true);
    setFilteredArr([...newArr]);
  };

  const windowState = () => {
    setWindow(false);
  };

  const showState = () => {
    console.log(todoState);
  };

  const deletRepository = (arg: string) => {
    const newArr = repositoryName.filter(({ name }) => arg !== name);
    setRepositoryName([...newArr]);
    console.log([...newArr]);
  };

  const changeThemeTest = () => {
  setTheme(theme === ' ' ? "dark" : ' ' )
  }
// <div className={[styles.App, styles[newThemeContext]].join(" ")}>
// <div className={styles.App + ' ' + styles.dark}>
  return (
    <div className={[styles.App, styles[theme]].join(" ")}>
      <AddRepository
        makeNewRepository={addNewRepository}
        openWindow={window}
        closeWindow={windowState}
      />
      <div className={styles.wrapperRepositorys}>
        <div>
          <button
            className={
              styles.repositoryButton + " " + styles.btn + " " + styles.plus
            }
            onClick={() => setWindow(true)}
          >
            <span>
              <FontAwesomeIcon icon={faPlus} />
            </span>
          </button>
        </div>
        {repositoryName.map(({ name, id, color }) => (//names разбить на  маленькие части (вернуть все обратно)
          <div
            key={id}
            className={
              styles.repositoryButton +
              " " +
              styles.repBtn +
              " " +
              styles[color]
            }
            onClick={() => {
              buttonFilter(name, id);
            }}
          >
             <span>{name}</span>
            {id !== "1111" ? (
              <button
                className={styles.deletRepository}
                onClick={() => deletRepository(name)} 
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            ) : '' }
          </div>
        ))}
      </div>

      <div className={[styles.wrapper, styles[theme]].join(" ")}>
      <Header/>
        <div className={styles.addTodo}>
          <AddTodo NewTodo={addTodo} getArr={repositoryName} />
        </div>

        <div className={styles.buttonMenu}>
          <button
            className={styles.buttons + " " + styles.btn}
            onClick={() => sortCheck()}
          >
            <span>
              {" "}
              <FontAwesomeIcon icon={faCheck} />
            </span>
          </button>
          <button
            className={styles.buttons + " " + styles.btn}
            onClick={() => timeFilter()}
          >
            {" "}
            <span>
              <FontAwesomeIcon icon={faClock} />
            </span>{" "}
          </button>
          <button
            className={styles.buttons + " " + styles.btn}
            onClick={() => clearFilter()}
          >
            {" "}
            <span>
              <FontAwesomeIcon icon={faCircle} />
            </span>{" "}
          </button>
          <button
            className={styles.buttons + " " + styles.btn}
            onClick={() => clearTodos()}
          >
            <span>
              <FontAwesomeIcon icon={faTrash} />
            </span>{" "}
          </button>
        </div>
    
        <div className={styles.todoList}>
          {(filterState ? filteredArr : todoState).map((el) => (
            <Todo
              key={el.id}
              {...el}
              doneTodo={doneTodo}
              deletTodo={deletTodo}
              changeTextTodo={changeTextTodo}
            />
          ))}
        </div>
      </div>
      <button
      className={styles.themeButton }
        onClick={()=>changeThemeTest()}
        >
        <span>{theme !== ' ' ? <FontAwesomeIcon icon={faSun} />
        : <FontAwesomeIcon icon={faMoon} rotation={270} />}</span>
      </button>
    </div>
  );
};
