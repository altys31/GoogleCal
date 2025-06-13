import { useState } from "react";
import "./App.css";
import { CalendarHeader } from "./components/CalendarHeader";
import { SideCalendar } from "./components/SideCalendar";
import { EventView } from "./components/EventView";
import { Modal } from "./components/Modal";

function App() {
  const [sideFold, setSideFold] = useState(false);
  const [modalOpen, setModalOpen] = useState(true);

  const handleSideFold = () => {
    setSideFold(!sideFold);
  };

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div>
      {modalOpen && <Modal handleModal={handleModal} />}
      <CalendarHeader sideFold={sideFold} handleSideFold={handleSideFold} />
      <div className="flex w-full">
        <SideCalendar sideFold={sideFold} handleModal={handleModal} />
        <EventView folded={sideFold} handleModal={handleModal} />
      </div>
    </div>
  );
}

export default App;
