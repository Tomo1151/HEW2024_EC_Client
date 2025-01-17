export function urlForImage(
  image_path,
  container_name = "icons",
  fallback = "https://placehold.jp/150x150.png"
) {
  const path = image_path
    ? `/api/images?url=${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/media/${container_name}/${image_path}`
    : fallback;
  return path;
}
