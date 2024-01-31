export function generateDate(year: number) {
  return new Date(Date.UTC(year, 1, 2, 3, 4, 5)).toString();
}

export function generateRandomString(length: number) {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
