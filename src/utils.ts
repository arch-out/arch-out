export function getRandomInt(min: number = 0, max: number = 100) {
  const ceilMin = Math.ceil(min);
  const floorMax = Math.floor(max);
  return Math.floor(Math.random() * (floorMax - ceilMin + 1)) + ceilMin;
}

export function getRandomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
