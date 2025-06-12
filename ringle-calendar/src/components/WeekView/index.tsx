export interface WeekViewProps {
  folded: boolean;
}
export const WeekView = ({ folded }: WeekViewProps) => {
  return (
    <div className={`border-4 h-full duration-300 ${folded ? `w-full` : `w-9/12`}`}>주간표</div>
  );
};
