export function calculateTimeDifference(timeStamp) {
  const time = Math.floor(new Date().getTime() / 1000);

  return Math.abs(time - timeStamp);
}