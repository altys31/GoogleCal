import { Checkbox, MenuItem, Select, TextField, type SelectChangeEvent } from "@mui/material";
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

  const [rMode, setRMode] = useState<boolean>(false);

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
  const [selectBoxItem, setSelectBoxItem] = useState<string>("선택");

  const [rRule, setRRule] = useState<string>("");

  useEffect(() => {
    setAppointmentDate(format(date, "yyyy-MM-dd'T'HH:mm:ss").split("T")[0]);
  }, [date]);

  const handleChange = (e: SelectChangeEvent<string>) => {
    setSelectBoxItem(e.target.value);

    switch (e.target.value) {
      case "선택":
        setRRule("");
        break;
      case "매일":
        setRRule("FREQ=DAILY");
        break;
      case "매주":
        setRRule("FREQ=WEEKLY");
        break;
      case "매달":
        setRRule("FREQ=MONTHLY");
    }
  };

  const addAppointment = () => {
    const newId = uuidv4();

    if (!title || !appointmentDate || !startTime || !endTime || (rMode && !rRule)) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const appointment = {
      id: newId,
      title: title,
      startDate: new Date(`${appointmentDate}T${startTime}`),
      endDate: new Date(`${appointmentDate}T${endTime}`),
      rRule: rRule,
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
        className={`w-[500px] h-[360px] p-12 rounded-3xl shadow-xl bg-white  overflow-hidden fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 `}
      >
        <div className={`absolute top-4 right-4 cursor-pointer`} onClick={() => closeModal()}>
          <HiMiniXMark size={24} color="black" />
        </div>
        <div className="w-full h-full flex flex-col justify-around items-start">
          <div className="pl-4">
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
          <div className="flex items-center text-xs pl-3">
            <Checkbox size="small" onClick={() => setRMode(!rMode)} /> 반복일정
            {rMode && (
              <div className="pl-4">
                <Select
                  size="small"
                  label="frequent"
                  value={selectBoxItem}
                  onChange={(e) => handleChange(e)}
                >
                  <MenuItem value={"선택"}>선택</MenuItem>
                  <MenuItem value={"매일"}>매일</MenuItem>
                  <MenuItem value={"매주"}>매주</MenuItem>
                  <MenuItem value={"매달"}>매달</MenuItem>
                </Select>
              </div>
            )}
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
