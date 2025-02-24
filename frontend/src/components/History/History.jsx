import "./History.css";
import "../App/App.css";
import { Link } from "react-router";
import { useRef, useState, useEffect } from "react";
import arrowForwardIcon from "../../assets/arrow-forward-icon.svg";
import arrowBackwardIcon from "../../assets/arrow-backward-icon.svg";
import userService from "../../services/userService";

export default function History() {
  const [user, setUser] = useState(null);
  const singedIn = localStorage.getItem("signedIn");
  useEffect(() => {
    if (singedIn) {
      async function getUserData() {
        const user = await userService.getUser();
        setUser(user);
        if (user.settings.lightMode) {
          document.body.classList.add("light");
        } else {
          document.body.classList.remove("light");
        }
      }
      getUserData();
    }
  }, [singedIn]);

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [blocks, setBlocks] = useState(null);

  useEffect(() => {
    async function setCalenderBlocks() {
      let newBlocks = [];

      let keyAdd = 0;

      const prevDays = daysFromPrev();
      if (prevDays.length < 7) {
        newBlocks.push(
          ...prevDays.map((day, index) => {
            return (
              <div className="calendar-block tinted-block" key={index}>
                {day}
              </div>
            );
          })
        );

        keyAdd += prevDays.length;
      }

      const monthHistory = await fetchMonthHistory(year, month, monthDays);

      let moods = [];
      if (monthHistory) {
        moods = monthHistory.map((entry) => {
          return { mood: entry.mood, date: new Date(entry.date) };
        });
      }

      for (let i = 0; i < monthDays; i++) {
        const moodEntry = moods.find((entry) => {
          const currDate = new Date(year, month, i + 2);
          currDate.setUTCHours(0, 0, 0, 0);

          return entry.date.getTime() === currDate.getTime();
        });

        newBlocks.push(
          <div
            className="calendar-block"
            key={i + keyAdd}
            style={{
              backgroundColor: moodEntry ? moodColors[moodEntry.mood] : null,
            }}
          >
            {i + 1}
          </div>
        );
      }

      keyAdd += monthDays;

      let i = 0;
      while (newBlocks.length % 7 !== 0) {
        newBlocks.push(
          <div className="calendar-block tinted-block" key={i + keyAdd}>
            {i + 1}
          </div>
        );
        i++;
      }

      setBlocks(newBlocks);
    }

    setCalenderBlocks();
  }, [month]);

  const moodColors = {
    veryDisatisfied: "#A9150A",
    disatisfied: "#F56156",
    neutral: "#F2CA26",
    satisfied: "#5EED65",
    verySatisfied: "#12A119",
  };

  async function fetchMonthHistory(year, month, monthDays) {
    const startDate = new Date(year, month, 2);
    const endDate = new Date(year, month, monthDays + 1);
    startDate.setUTCHours(0, 0, 0, 0);
    endDate.setUTCHours(0, 0, 0, 0);

    const monthHistory = await userService.getUserHisory({
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
    });

    return monthHistory;
  }

  let minDate = false;
  if (month === 1 && year === 2025) {
    minDate = true;
  }

  function incrementMonth() {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  }

  function decrementMonth() {
    if (minDate) {
      return;
    }

    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let day = new Date().getDay();
  let monthDays = daysInMonth(month, year);

  function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  function daysFromPrev() {
    let prevMonth = month - 1;
    let prevYear = year;
    if (prevMonth === -1) {
      prevYear--;
      prevMonth = 11;
    }
    let prevDays = daysInMonth(prevMonth, prevYear);

    // Sunday - Saturday : 0 - 6
    const startDay =
      prevDays - new Date(prevYear, prevMonth, prevDays).getDay();

    const days = [];
    for (let i = startDay; i <= prevDays; i++) {
      days.push(i);
    }

    return days;
  }

  if (!user) return null;

  return (
    <div className="history-page">
      <Link to={"/"} className="nav-main">
        <button>Main</button>
      </Link>
      <div className="history">
        <p>{year}</p>
        <div className="calendar-control">
          <button
            onClick={decrementMonth}
            disabled={minDate}
            className={minDate ? "disabled" : ""}
          >
            <img src={arrowBackwardIcon} alt="Previous month" />
          </button>
          <p>{monthNames[month]}</p>
          <button onClick={incrementMonth}>
            <img src={arrowForwardIcon} alt="Next month" />
          </button>
        </div>
        {blocks && (
          <div className="calendar">{blocks.map((block) => block)}</div>
        )}
      </div>
    </div>
  );
}
