import { useState } from "react";
import "./App.css";
import { CalendarHeader } from "./components/CalendarHeader";
import { SideCalendar } from "./components/SideCalendar";
import { EventView } from "./components/EventView";

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
        <EventView folded={sideFold} />
      </div>
    </div>
  );
}

export default App;
