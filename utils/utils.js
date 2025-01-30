export function replaceRoute(url) {
  if (!window) return;
  window.history.replaceState(
    { ...window.history.state, as: url, url },
    "",
    url
  );
}

export function urlForImage(
  image_path,
  container_name = "icons",
  fallback = "https://placehold.jp/150x150.png"
) {
  const path = image_path
    ? // ? `/api/images?url=${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/media/${container_name}/${image_path}`
      `${process.env.NEXT_PUBLIC_FETCH_BASE_URL}/media/${container_name}/${image_path}`
    : fallback;
  return path;
}

export function extractLiveIdentifier(live_link) {
  const template = {
    id: "",
    type: "",
    isValid: false,
  };

  if (!live_link || !URL.canParse(live_link)) return template;

  // YouTube Live
  if (live_link.includes("youtube.com")) {
    const url = new URL(live_link);
    const paths = url.pathname.split("/");
    const id = paths.pop();

    if (id.length !== 11) return template;

    return {
      id,
      type: "youtube",
      isValid: true,
    };
  }

  // Twitch Live
  if (live_link.includes("twitch.tv")) {
    const url = new URL(live_link);
    const paths = url.pathname.split("/");
    const username = paths.pop();

    if (username.length === 0) return template;

    return {
      id: username,
      type: "twitch",
      isValid: true,
    };
  }
}
