export { default } from "./Register.svelte";

export function checkUsernameValidity(string: string) {
  const isValid = new RegExp("^[a-zA-Z0-9_-]+$");
  return isValid.test(string);
}
