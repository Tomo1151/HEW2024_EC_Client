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
    case "content":
      return value.length <= 500;
    case "price":
      return String(value).match(/^[0-9]+$/);
    case "name":
      return value.length <= 100;
    case "tag":
      return value.length <= 20;
    case "liveLink":
      return extractLiveIdentifier(value).isValid;
    default:
      return true;
  }
}
