export const convertHeaderDate = (date: Date) => {
  const textDate = date.getFullYear() + "년 " + (date.getMonth() + 1) + "월";
  return textDate;
};

// date Type의 input에 사용하는 변환 메서드
export const formatDateToYYYYMMDD = (date: Date) => {
  return date.toISOString().split("T")[0]; // 예: "2025-06-13"
};
