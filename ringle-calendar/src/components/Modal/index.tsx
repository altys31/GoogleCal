import { TextField } from "@mui/material";
import styles from "./style.module.scss";
import { HiMiniXMark } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useState } from "react";
import { addAppointment as addAppointmentAction } from "../../store/appointmentSlice";
import { v4 as uuidv4 } from "uuid";

export interface ModalProps {
  handleModal: () => void;
}

export const Modal = ({ handleModal }: ModalProps) => {
  const date = useSelector((state: RootState) => state.date.currentDate);
  const appointments = useSelector((state: RootState) => state.appointment.currentEvent);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const addAppointment = () => {
    const newId = uuidv4();

    if (!title || !date || !startTime || !endTime) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const appointment = {
      id: newId,
      title: title,
      startDate: new Date(`${date}T${startTime}`),
      endDate: new Date(`${date}T${endTime}`),
    };

    if (startTime >= endTime) {
      alert("시작 시간은 종료 시간보다 빨라야 합니다.");
      return;
    }

    dispatch(addAppointmentAction(appointment));
    handleModal();
  };

  return (
    <div className={`absolute z-[100] flex items-center justify-center`}>
      <div
        className={`w-[400px] h-[360px] p-12 rounded-3xl shadow-xl bg-gray-100 overflow-hidden bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 `}
      >
        <div className={`absolute top-4 right-4`} onClick={() => handleModal()}>
          <HiMiniXMark size={24} color="black" />
        </div>
        <div className="w-full h-full flex flex-col justify-around items-start">
          <div>
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목 추가"
            />
          </div>
          <div className="w-full flex justify-around">
            <input
              className="w-24"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              type="date"
            />
            <input value={startTime} onChange={(e) => setStartTime(e.target.value)} type="time" />
            <input value={endTime} onChange={(e) => setEndTime(e.target.value)} type="time" />
          </div>
          <div className="w-full flex justify-end gap-4">
            <button
              className="text-white ml-2 bg-blue-700 hover:bg-blue-800 font-medium rounded-md text-sm px-5 py-2.5 text-center"
              onClick={() => addAppointment()}
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
