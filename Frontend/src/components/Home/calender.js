import React, { useState } from "react";
import '../../styles/calender.css';

const Calendar = ({onDateSelect}) => {
  const today = new Date();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(null);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const totalDays = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
        setSelectedDay(null); 

  };
    const isToday = (day) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
        setSelectedDay(null); 

  };

   const handleSelectDay = (day) => {
    setSelectedDay(day);
    if (onDateSelect) {
      const selectedDate = new Date(year, month, day);
      onDateSelect(selectedDate); 
    }
  };

  return (
    <aside className="calendar-container">
      <div className="calendar-header">
        <button onClick={prevMonth} className="arrow-btn">←</button>
        <h1 className="calendar-title">{monthNames[month]} {year}</h1>
        <button onClick={nextMonth} className="arrow-btn">→</button>
      </div>

      <ol className="calendar">
        {dayNames.map((day, index) => (
          <li key={index} className="day-name">{day}</li>
        ))}

        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <li key={`empty-${index}`}></li>
        ))}

        {Array.from({ length: totalDays }).map((_, index) => {
                  const day = index + 1;
        return (
          <li
           key={day}
           className={`${selectedDay === day ? "selected" : ""}${isToday(day) ? "today" : ""}`}
              onClick={() => handleSelectDay(day)} >
          
          {day}
          </li>
        );
})}
      </ol>
    </aside>
  );
};

export default Calendar;
