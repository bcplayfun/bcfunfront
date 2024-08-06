import { define } from "superstruct";
import { isEmail } from "./validation";

export function detectErrors({ message, key }: any) {
  if (key === "phone_number") {
    return "Phone number is required";
  }
  return message;
}

export const lettersOnly = define("lettersOnly", (value) => {
  if (typeof value !== "string") {
    return "Value must be a string";
  }
  if (value.length < 2) {
    return `Min. length is 2 characters`;
  }
  return true;
});

export const usernameCheck = define("usernameCheck", (value) => {
  if (typeof value !== "string") {
    return "Value must be a string";
  }
  if (value.length < 5) {
    return "Min. length is 5 characters";
  }
  if (/^[a-zA-Z0-9-_]+$/.test(value)) {
    return true; // It's valid
  }
  return "Value must contain A-z, 0-9, -, _";
});

export const passwordCheck = define("passwordCheck", (value) => {
  if (typeof value !== "string") {
    return "Value must be a string";
  }
  if (value.length < 6) {
    return "Min. length is 6 characters";
  }

  return true;
  // if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/.test(value)) {
  //   return true; // It's valid
  // }
  // return "Value must contain 1 uppercase, 1 number";
});

export const emailCheck = define("email", (value) => {
  if (isEmail(value)) {
    return true;
  }
  return "Enter a valid email";
});
