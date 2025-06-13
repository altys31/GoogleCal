import { HiMiniXMark } from "react-icons/hi2";
import { FaTrashAlt } from "react-icons/fa";
import type { Appointment } from "../../types/type";
import { FaSquare } from "react-icons/fa";
import styles from "./style.module.scss";
import { useDispatch } from "react-redux";
import { deleteAppointment } from "../../store/appointmentSlice";

export interface EditModalProps {
  closeModal: () => void;
  selectedEvent: Appointment | undefined;
}

export const EditModal = ({ closeModal, selectedEvent }: EditModalProps) => {
  const dispatch = useDispatch();

  return (
    <div className={`absolute z-[100] flex items-center justify-center`}>
      <div
        className={`w-[400px] h-[150px] p-8 rounded-3xl shadow-xl bg-gray-200 overflow-hidden bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 `}
      >
        <div className="flex justify-end items-center gap-4">
          <div
            className={`cursor-pointer`}
            onClick={() => {
              if (selectedEvent) {
                dispatch(deleteAppointment(selectedEvent.id));
                closeModal();
              }
            }}
          >
            <FaTrashAlt />
          </div>
          <div className={`cursor-pointer`} onClick={() => closeModal()}>
            <HiMiniXMark size={24} color="black" />
          </div>
        </div>

        <div className={`grid gap-1 ${styles.titleBox}`}>
          <div className={`flex justify-center ${styles.iconBox}`}>
            <FaSquare color="skyblue" size={32} />
          </div>
          <div
            className={`flex justify-start items-center leading-none text-xl font-bold ${styles.textBox}`}
          >
            {selectedEvent ? selectedEvent.title : ""}
          </div>
          <div></div>
          <div className="flex justify-start text-xs font-semibold">
            {selectedEvent
              ? selectedEvent.startDate.toLocaleDateString() +
                " " +
                selectedEvent.startDate.toLocaleTimeString() +
                " ~ " +
                selectedEvent.endDate.toLocaleTimeString()
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};
