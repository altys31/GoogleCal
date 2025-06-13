import { TextField } from "@mui/material";
import { HiMiniXMark } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { addAppointment as addAppointmentAction } from "../../store/appointmentSlice";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

export interface ModalProps {
  closeModal: () => void;
}

export const AddModal = ({ closeModal }: ModalProps) => {
  const date = useSelector((state: RootState) => state.date.currentDate);
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>("");
  const [appointmentDate, setAppointmentDate] = useState<string>(
    format(date, "yyyy-MM-dd'T'HH:mm:ss").split("T")[0]
  );
  const [startTime, setStartTime] = useState<string>(
    format(date, "yyyy-MM-dd'T'HH:mm:ss").split("T")[1]
  );
  const [endTime, setEndTime] = useState<string>(
    format(date, "yyyy-MM-dd'T'HH:mm:ss").split("T")[1]
  );

  useEffect(() => {
    setAppointmentDate(format(date, "yyyy-MM-dd'T'HH:mm:ss").split("T")[0]);
  }, [date]);

  const addAppointment = () => {
    const newId = uuidv4();

    if (!title || !date || !startTime || !endTime) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const appointment = {
      id: newId,
      title: title,
      startDate: new Date(`${appointmentDate}T${startTime}`),
      endDate: new Date(`${appointmentDate}T${endTime}`),
    };

    if (startTime >= endTime) {
      alert("시작 시간은 종료 시간보다 빨라야 합니다.");
      return;
    }

    dispatch(addAppointmentAction(appointment));
    closeModal();
  };

  return (
    <div className={`absolute z-[100] flex items-center justify-center`}>
      <div
        className={`w-[500px] h-[360px] p-12 rounded-3xl shadow-xl bg-gray-100 overflow-hidden bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 `}
      >
        <div className={`absolute top-4 right-4 cursor-pointer`} onClick={() => closeModal()}>
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
          <div className="w-full flex justify-around text-xs">
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
