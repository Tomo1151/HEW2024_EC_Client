import { extractLiveIdentifier } from "./utils";

export function inputValidator(name, value) {
  // console.log(name, value);
  switch (name) {
    case "username":
      return value.length >= 3 && value.length <= 20;
    case "email":
      return value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    case "password":
      return value.length >= 8 && value.length <= 20;
    case "nickname":
      return value.length >= 3 && value.length <= 20;
    case "description":
      return 10 <= value.length && value.length <= 120;
    case "price":
      return value === "" || String(value).match(/^[0-9]+$/);
    case "name":
      return 3 <= value.length && value.length <= 64;
    case "tagInput":
      return value.length <= 100;
    case "liveLink":
      return extractLiveIdentifier(value).isValid;
    case "data":
      return (
        0 < value.size &&
        value.size <= 1 * 1024 * 1024 * 1024 &&
        (value.type === "application/zip" ||
          value.type === "application/x-zip-compressed" ||
          value.type === "image/jpeg" ||
          value.type === "image/png" ||
          value.type === "image/gif" ||
          value.type === "image/webp")
      );
    case "images":
      return (
        0 < value.length &&
        value.every(
          (image) => 0 < image.size && image.size <= 5 * 1024 * 1024
        ) &&
        value.every(
          (image) =>
            image.type === "image/jpeg" ||
            image.type === "image/png" ||
            image.type === "image/gif" ||
            image.type === "image/webp"
        )
      );
    default:
      return false;
  }
}
