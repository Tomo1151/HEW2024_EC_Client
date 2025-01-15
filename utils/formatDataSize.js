export function formatDataSize(size, limit = 5) {
  // サイズが負である場合はエラーを返す
  if (size < 0 || limit <= 0) {
    return "無効な入力";
  }

  // バイトの単位定義
  const units = ["B", "KB", "MB", "GB"];
  let unitIndex = 0;

  // サイズが1,000以上の場合、適切な単位を見つける
  while (size >= 1000 && unitIndex < units.length - 1) {
    size /= 1000;
    unitIndex++;
  }

  // GB以上の場合は制限を確認
  if (unitIndex >= 3 && size >= limit) {
    return "ファイルサイズが大きすぎます";
  }

  // 小数点以下1桁にフォーマット
  const formattedSize = size.toFixed(1) + units[unitIndex];
  return formattedSize;
}
