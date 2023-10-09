import { createContext, useState } from "react";
import styles from "./style.module.scss";

export const ThemeContext = createContext("dark");

export const ThemeContainer = (props: { children: React.ReactNode }) => {
  const [containerState, setContainerState] = useState("light");

  return (
    <ThemeContext.Provider value={containerState}>
      <button
        onClick={() => {
          setContainerState(containerState === "dark" ? "light" : "dark");
        }}
        className={styles.themeButton + " " + styles.repBtn}
      >
        <span>{containerState}</span>
      </button>
      {props.children}
    </ThemeContext.Provider>
  );
};
