import Alert from "$lib/elements/Alert";

export function maskString(str: string) {
  return (
    str.substring(0, 2) + "**" + str.substring(str.length - 1, str.length - 3)
  );
}

export function copyString(str: string | null, key: string) {
  if (!str) {
    Alert.error("Failed to copy address");
    return;
  }
  navigator.clipboard.writeText(str).then(
    () => {
      Alert.success("Address copied");
    },
    () => {
      Alert.error("Failed to copy address");
    }
  );
}

export function formatNumber(number: number): string {
  const options = {
    minimumFractionDigits: 0, // Minimum number of decimal places
    maximumFractionDigits: 4, // Maximum number of decimal places
  };
  return number.toLocaleString("en-US", options);
}

export function isJsonString(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
