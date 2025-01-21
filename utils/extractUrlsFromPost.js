export function extractUrlsFromPost(text) {
  const urls = text.match(/https?:\/\/[\S\N]+/g) ?? [];
  return urls;
}
