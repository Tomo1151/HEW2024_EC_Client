export function extractTagsFromPost(text) {
  const noUrlText = text.replace(/https?:\/\/[\S\N]+/g);
  const found = noUrlText.match(
    /(?<=([^\w\p{L}]|^)[#＃])[\w\p{L}]{1,64}(?=[^\w\p{L}#＃]|$)/gu
  );
  const tags = Array.from(new Set(found));
  return tags;
}
