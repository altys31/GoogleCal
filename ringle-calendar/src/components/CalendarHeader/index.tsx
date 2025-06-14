import styles from "./style.module.scss";
import { convertHeaderDate } from "../../utils/utils";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import type { RootState } from "../../store/store";
import { goToNextWeek, goToPrevWeek, resetToToday } from "../../store/dateSlice";
import calIcon from "../../assets/googleCalendarIcon.png";
import { useDispatch, useSelector } from "react-redux";

export interface CalendarHeaderProps {
  handleSideFold: () => void;
}

export const CalendarHeader = ({ handleSideFold }: CalendarHeaderProps) => {
  const date = useSelector((state: RootState) => state.date.currentDate);
  const dispatch = useDispatch();

  return (
    <header className="flex min-h-12 border-4 justify-center items-center">
      <div className="w-3/12 flex gap-4 ml-4 items-center">
        <div className={styles.hamburgerButton} onClick={handleSideFold}>
          <GiHamburgerMenu />
        </div>
        <div className="flex gap-2 items-center">
          <img src={calIcon} className="w-12" />
          <div className="font-semibold text-slate-600">캘린더</div>
        </div>
      </div>

      <div className="w-9/12 flex justfy-around gap-4">
        <div className={styles.setTodayButton} onClick={() => dispatch(resetToToday())}>
          오늘
        </div>
        <div className="flex">
          <div className={styles.arrowButton}>
            <IoIosArrowBack onClick={() => dispatch(goToPrevWeek())} />
          </div>
          <div className={styles.arrowButton}>
            <IoIosArrowForward onClick={() => dispatch(goToNextWeek())} />
          </div>
        </div>
        <div className="select-none font-middle">{convertHeaderDate(date)}</div>
      </div>
    </header>
  );
};
