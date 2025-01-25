export function formatPrice(price) {
  return isNaN(parseInt(price))
    ? "価格未設定"
    : parseInt(price).toLocaleString("ja-JP", {
        style: "currency",
        currency: "JPY",
      });
}
