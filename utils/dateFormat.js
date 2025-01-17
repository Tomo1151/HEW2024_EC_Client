export function dateFormat(targetDate, currentDate = new Date()) {
  const diff = currentDate.getTime() - targetDate.getTime();

  const minutesCheckDate = new Date(currentDate.getTime());
  const hourCheckDate = new Date(currentDate.getTime());
  const dayCheckDate = new Date(currentDate.getTime());
  const yearCheckDate = new Date(currentDate.getTime());

  minutesCheckDate.setMinutes(currentDate.getMinutes() - 1);
  hourCheckDate.setHours(currentDate.getHours() - 1);
  dayCheckDate.setDate(currentDate.getDate() - 1);
  yearCheckDate.setFullYear(currentDate.getFullYear() - 1);

  if (Number.isNaN(targetDate.getTime())) {
    return "不明";
  } else if (targetDate > minutesCheckDate) {
    return "たった今";
  } else if (targetDate > hourCheckDate) {
    return `${Math.trunc(diff / (60 * 1000))}分前`;
  } else if (targetDate > dayCheckDate) {
    return `${Math.trunc(diff / (60 * 60 * 1000))}時間前`;
  } else if (targetDate > yearCheckDate) {
    return `${targetDate.getMonth() + 1}月${targetDate.getDate()}日`;
  } else {
    return `${targetDate.getFullYear()}年${
      targetDate.getMonth() + 1
    }月${targetDate.getDate()}日`;
  }
}
