import { useEffect, useState } from "react";
import styles from "./sryles.module.scss";
import { getRandomID } from "../App/App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Plans } from "../CalernadPlans/CalendarPlans";

interface Plans {
  id: string;
  title: string;
  describe: string;
}

interface Day {
  id: string;
  number: number;
  dayOfWeek: any;
  display: boolean;
  plans: {
    id: string;
    title: string;
    describe: string;
  };
}

interface Month {
  number: number;
  name: string;
  days: number;
  daysArr: Day[] | any[];
}

export const Header = () => {
  const [stateCalendar, setStateCalendar] = useState<Month[]>([]);
  const [monthState, setMonthState] = useState(0);

  const [notesWindow, setNotesWindow] = useState(false)
  
  const [notes, setNotes] = useState('')


  const monthsConteiner: Month[] = [
    {
      name: "January",
      number: 0,
      days: 31,
      daysArr: [],
    },
    {
      name: "February",
      number: 1,
      days: 28,
      daysArr: [],
    },
    {
      name: "March",
      number: 2,
      days: 31,
      daysArr: [],
    },
    {
      name: "April",
      number: 3,
      days: 30,
      daysArr: [],
    },
    {
      name: "May",
      number: 4,
      days: 31,
      daysArr: [],
    },
    {
      name: "June",
      number: 5,
      days: 30,
      daysArr: [],
    },
    {
      name: "July",
      number: 6,
      days: 31,
      daysArr: [],
    },
    {
      name: "August",
      number: 7,
      days: 31,
      daysArr: [],
    },
    {
      name: "September",
      number: 8,
      days: 30,
      daysArr: [],
    },
    {
      name: "October",
      number: 9,
      days: 31,
      daysArr: [],
    },
    {
      name: "November",
      number: 10,
      days: 30,
      daysArr: [],
    },
    {
      name: "December",
      number: 11,
      days: 31,
      daysArr: [],
    },
  ];

  const daysOfWeeks: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function getWeekDay(month: number, day: number, days: string[]) {
    let date = new Date(2023, month, day);
    return days[date.getDay()];
  }

  const pushDays = (monthNum: number, arrPerent: any[] = [], days: number) => {
    for (let i = 0; i < days; i++) {
      let day: Day = {
        id: getRandomID(),
        number: i + 1,
        dayOfWeek: getWeekDay(monthNum, i + 1, daysOfWeeks),
        display: true,
        plans: {
          id: getRandomID(),
          title: "",
          describe: "",
        },
      };

      arrPerent.push(day);
    }
  };

  const finish = () => {
    monthsConteiner.map(({ daysArr, number }) => {
      const num = daysOfWeeks.indexOf(daysArr[0].dayOfWeek);
      for (let i = 0; i < num; i++) {
        let prevMonth = number - 1;
        const last = monthsConteiner[prevMonth].days;
        let numLast = last - i;
        const obg: Day = {
          id: getRandomID(),
          number: numLast,
          dayOfWeek: "",
          display: false,
          plans: {
            id: getRandomID(),
            title: "",
            describe: "",
          },
        };
        daysArr.unshift(obg);
      }

      const endNum = 42 - daysArr.length;
      for (let i = 1; i <= endNum; i++) {
        const obg2: Day = {
          id: getRandomID(),
          number: i,
          dayOfWeek: "",
          display: false,
          plans: {
            id: getRandomID(),
            title: "",
            describe: "",
          },
        };
        daysArr.push(obg2);
      }
    });
  };

  const newArr = monthsConteiner.map(({ number, daysArr, days }) => {
    pushDays(number, daysArr, days);
  });

  finish();

  useEffect(() => {
    setStateCalendar(monthsConteiner);
  }, []);

  //console.log(stateCalendar);
  const changeMonthForward = () => {
    if (monthState === -2310) return //перем offset
    setMonthState(monthState - 210);//вынести в переменную 

  };
  const changeMonthBack = () => {
    if (monthState === 0) return
    setMonthState(monthState + 210);

  };


const openNotes = (e:any) => {
  setNotesWindow(true)
  console.log(e)
}


const closeNotes  = () => {
  setNotesWindow(false)
}

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.calendarWrapper}>
        <button
          className={monthState !== 0 ? styles.calendarBtn : styles.calendarBtn + ' ' + styles.tonDisplay}
          onClick={() => changeMonthBack()}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className={styles.calendarWindow}>
          <div
            className={styles.calendar}
            style={{ transform: `translateX(${monthState}px)` }}//num of month * vigetWidth
          >
            {stateCalendar.map(({ name, daysArr }) => (
              <div className={styles.month} key={getRandomID()}>
                <h3>{name}</h3>
                <div className={styles.daysOfWeek}>
                  {daysOfWeeks.map((el) => (
                    <div key={getRandomID()}>{el}</div>
                  ))}
                </div>

                <div className={styles.days}>
                  {daysArr.map(({id, number, plans, display }) => (
                    <div
                    onClick={()=>openNotes(id)}//передать весь обьект 
                      className={
                        display
                          ? styles.day
                          : styles.day + " " + styles.tonDisplay
                      }
                      key={getRandomID()}
                    >
                      {number !== 0 ? number : ""}
                      <p key={getRandomID()}>{plans.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={() => changeMonthForward()}
          className={monthState !== -2310 ? styles.calendarBtn : styles.calendarBtn + ' ' + styles.tonDisplay}
        >
          <FontAwesomeIcon icon={faChevronLeft} rotation={180} />
        </button>
      </div>
      <form 
      onSubmit={(e)=>e.preventDefault()}
      className={ notesWindow ? styles.form : styles.form + ' ' + styles.close} action="">
                 <button
                 onClick={()=>closeNotes()}
                 type="submit">X</button>
            <input type="text" placeholder="Title"/>
            <input type="text" placeholder="Discribe"/>
       
        </form>
    </div>
  );
};
