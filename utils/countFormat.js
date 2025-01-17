export function countFormat(count) {
  if (count < 10000) {
    return count.toLocaleString("ja-JP");
  } else if (count < 100000) {
    return (
      (Math.floor(count / 1000) / 10).toFixed(1).toLocaleString("ja-JP") + "万"
    );
  } else if (count < 100000000) {
    return Math.floor(count / 10000).toLocaleString("ja-JP") + "万";
  } else {
    return "たくさん";
  }
}
