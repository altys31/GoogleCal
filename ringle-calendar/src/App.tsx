import { useState } from "react";
import "./App.css";
import { CalendarHeader } from "./components/CalendarHeader";
import { SideCalendar } from "./components/SideCalendar";
import { WeekView } from "./components/WeekView";

function App() {
  const [date, setDate] = useState(new Date());
  const [sideFold, setSideFold] = useState(false);

  const setTodayDate = () => {
    setDate(new Date());
  };

  const handleSideFold = () => {
    setSideFold(!sideFold);
  };

  const handleNextweek = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 7);
    setDate(newDate);
  };

  const handlePreviousweek = () => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - 7);
    setDate(newDate);
  };

  return (
    <div>
      <CalendarHeader
        date={date}
        setTodayDate={setTodayDate}
        plusWeek={handleNextweek}
        minusWeek={handlePreviousweek}
        sideFold={sideFold}
        handleSideFold={handleSideFold}
      />
      <div className="flex w-full">
        <SideCalendar sideFold={sideFold} />
        <WeekView />
      </div>
    </div>
  );
}

export default App;
