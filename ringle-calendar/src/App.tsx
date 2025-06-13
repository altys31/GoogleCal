import { useState } from "react";
import "./App.css";
import { CalendarHeader } from "./components/CalendarHeader";
import { SideCalendar } from "./components/SideCalendar";
import { EventView } from "./components/EventView";
import { AddModal } from "./components/AddModal";
import { EditModal } from "./components/EditModal";
import type { Appointment } from "./types/type";

function App() {
  const [sideFold, setSideFold] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<Appointment | undefined>();

  const handleSideFold = () => {
    setSideFold(!sideFold);
  };

  const handleSelectedEvent = (e: Appointment) => {
    setSelectedEvent(e);
  };

  const openAddModal = () => {
    setAddModalOpen(true);
    setEditModalOpen(false);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  const openEditModal = () => {
    setEditModalOpen(true);
    setAddModalOpen(false);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  return (
    <div>
      {addModalOpen && <AddModal closeModal={closeAddModal} />}
      {editModalOpen && <EditModal selectedEvent={selectedEvent} closeModal={closeEditModal} />}
      <CalendarHeader sideFold={sideFold} handleSideFold={handleSideFold} />
      <div className="flex w-full">
        <SideCalendar sideFold={sideFold} handleModal={openAddModal} />
        <EventView
          folded={sideFold}
          openAddModal={openAddModal}
          openEditModal={openEditModal}
          handleSelectedEvent={handleSelectedEvent}
        />
      </div>
    </div>
  );
}

export default App;
