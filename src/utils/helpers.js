export function formatPhoneNumber(phone) {
  phone = phone.toString();
  const ddd = phone.slice(0, 1);
  const firstFourChars = phone.slice(2, 5);
  const lastFourChars = phone.slice(5, 9);
  return `(${ddd}) ${firstFourChars}-${lastFourChars}`;
}

export function isEmpty(input) {
  if (Array.isArray(input)) {
    return input.length === 0;
  }

  return !input || Object.keys(input).length === 0;
}
