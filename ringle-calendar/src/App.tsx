import { useState } from "react";
import "./App.css";
import { CalendarHeader } from "./components/CalendarHeader";
import { SideCalendar } from "./components/SideCalendar";
import { WeekView } from "./components/WeekView";

function App() {
  const [sideFold, setSideFold] = useState(false);

  const handleSideFold = () => {
    setSideFold(!sideFold);
  };

  return (
    <div>
      <CalendarHeader sideFold={sideFold} handleSideFold={handleSideFold} />
      <div className="flex w-full">
        <SideCalendar sideFold={sideFold} />
        <WeekView folded={sideFold} />
      </div>
    </div>
  );
}

export default App;
