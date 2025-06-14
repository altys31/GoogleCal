export const convertHeaderDate = (date: Date) => {
  const textDate = date.getFullYear() + "년 " + (date.getMonth() + 1) + "월";
  return textDate;
};
