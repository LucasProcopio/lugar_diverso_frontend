export function isEmpty(input) {
  if (Array.isArray(input)) {
    return input.length === 0;
  }

  return !input || Object.keys(input).length === 0;
}
