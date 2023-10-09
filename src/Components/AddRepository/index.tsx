import React, { useEffect, useState, FC } from "react";
import { getRandomID } from "../App/App";
import styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface AddNewRepositoryProps {
  makeNewRepository: (arg: Repository) => void;
  openWindow: boolean;
  closeWindow: (arg: boolean) => void;
}

export interface Repository {
  id: string;
  name: string;
  color: string;
}

export const AddRepository: FC<AddNewRepositoryProps> = ({
  makeNewRepository,
  openWindow,
  closeWindow,
}) => {
  const [newRepositoryName, setNewRepositoryName] = useState("");
  const [color, setColor] = useState("");
  const [windowState, setWindowState] = useState(false);

  const addNewName: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (!newRepositoryName) return;

    const repository = {
      id: getRandomID(),
      name:
        newRepositoryName.charAt(0).toUpperCase() + newRepositoryName.slice(1),
      color: color,
    };

    makeNewRepository(repository);
    setNewRepositoryName("");
    console.log(color);
    setColor("");
  };

  useEffect(() => {
    setWindowState(openWindow);
  }, [openWindow]);

  const closeWindowRep = () => {
    setWindowState(false);
    closeWindow(false);
  };

/*
const colorArray = ['', "Blue", "Red", "Green", "Yellow", "Purpur" ]
  {colorArray.map((el)=>
             <input
             value={el}
             className={[styles.radioInput, styles[el]].join("")}
             type="radio"
             name="radio"
             id={getRandomID()}
            
             onChange={(event) => {
               setColor(event.target.value);
             }}
           ></input>)
          }
      */

  return (
    <div className={windowState ? styles.windowDiv : styles.windowDivClose}>
      <div className={styles.formWindowDiv}>
        <form action="" onSubmit={(event) => addNewName(event)}>
          <input
            type="text"
            placeholder="Enter new name of repository"
            onChange={(event) => {
              setNewRepositoryName(event.target.value);
            }}
            value={newRepositoryName}
          ></input>
          <div className={styles.radioDiv}>
            <input
              className={styles.radioInputOriginal}
              type="radio"
              name="radio"
              id="answer"
              value=""
            ></input>
    
            <input
              className={styles.radioInputBlue}
              type="radio"
              name="radio"
              id="answer1"
              value="Blue"
              onChange={(event) => {
                setColor(event.target.value);
              }}
            ></input>

            <input
              className={styles.radioInputRed}
              type="radio"
              name="radio"
              id="answer2"
              value="Red"
              onChange={(event) => {
                setColor(event.target.value);
              }}
            ></input>

            <input
              className={styles.radioInputGreen}
              type="radio"
              name="radio"
              id="answer3"
              value="Green"
              onChange={(event) => {
                setColor(event.target.value);
              }}
            ></input>

            <input
              className={styles.radioInputYellow}
              type="radio"
              name="radio"
              id="answer4"
              value="Yellow"
              onChange={(event) => {
                setColor(event.target.value);
              }}
            ></input>

            <input
              className={styles.radioInputPurpur}
              type="radio"
              name="radio"
              id="answer5"
              value="Purpur"
              onChange={(event) => {
                setColor(event.target.value);
              }}
            ></input>
            <button type="submit"></button>
          </div>
        </form>

        <button onClick={() => closeWindowRep()} className={styles.buttonClose}>
          <span>
            <FontAwesomeIcon icon={faXmark} />
          </span>
        </button>
      </div>
    </div>
  );
};
