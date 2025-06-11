import { convertHeaderDate } from "../utils/utils";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import calIcon from "../assets/googleCalendarIcon.png";
import "./CalendarHeader.scss";

export interface CalendarHeaderProps {
  date: Date;
  setTodayDate: () => void;
  plusWeek: () => void;
  minusWeek: () => void;
  sideFold: boolean;
  handleSideFold: () => void;
}

export const CalendarHeader = ({
  date,
  setTodayDate,
  plusWeek,
  minusWeek,
  sideFold,
  handleSideFold,
}: CalendarHeaderProps) => {
  return (
    <header className="flex min-h-12 border-4 justify-center items-center">
      <div className="w-3/12 flex gap-4 ml-4 items-center">
        <div className="hamburgerButton" onClick={handleSideFold}>
          <GiHamburgerMenu />
        </div>
        <div className="flex gap-2 items-center">
          <img src={calIcon} className="w-12"></img>
          <div className="font-semibold text-slate-600">캘린더</div>
        </div>
      </div>

      <div className="w-9/12 flex justfy-around gap-4">
        <div className="setTodayButton" onClick={setTodayDate}>
          오늘
        </div>
        <div className="flex">
          <div className="arrowButton">
            <IoIosArrowBack onClick={minusWeek} />
          </div>
          <div className="arrowButton">
            <IoIosArrowForward onClick={plusWeek} />
          </div>
        </div>
        <div className="select-none font-middle font-sans">{convertHeaderDate(date)}</div>
      </div>
    </header>
  );
};
