export function dateFormat(targetDate, currentDate = new Date()) {
  const minutesCheckDate = new Date(currentDate.getTime());
  const houreCheckDate = new Date(currentDate.getTime());
  const dayCheckDate = new Date(currentDate.getTime());
  const yearCheckDate = new Date(currentDate.getTime());

  minutesCheckDate.setMinutes(currentDate.getMinutes() - 1);
  houreCheckDate.setHours(currentDate.getHours() - 1);
  dayCheckDate.setDate(currentDate.getDate() - 1);
  yearCheckDate.setFullYear(currentDate.getFullYear() - 1);
  if (Number.isNaN(targetDate.getTime())) {
    return "不明";
  } else if (targetDate > minutesCheckDate) {
    return "たった今";
  } else if (targetDate > houreCheckDate) {
    const diff = currentDate.getTime() - targetDate.getTime();
    return `${diff / (60 * 1000)}分前`;
  } else if (targetDate > dayCheckDate) {
    console.log(targetDate);
    console.log(dayCheckDate);
    const diff = currentDate.getTime() - targetDate.getTime();
    return `${diff / (60 * 60 * 1000)}時間前`;
  } else if (targetDate > yearCheckDate) {
    const diff = currentDate.getTime() - targetDate.getTime();
    return `${targetDate.getMonth() + 1}月${targetDate.getDate()}日`;
  } else {
    const diff = currentDate.getTime() - targetDate.getTime();
    return `${targetDate.getFullYear()}年${
      targetDate.getMonth() + 1
    }月${targetDate.getDate()}日`;
  }
}
