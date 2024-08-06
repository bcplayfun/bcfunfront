export function generateAlias(name: string) {
  return name.replace(/\s+/g, "-").toLowerCase();
}
