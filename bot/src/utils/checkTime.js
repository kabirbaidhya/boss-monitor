/**
 * Calculate the time difference between the request sent time and the current time.
 * 
 * @param {timeStamp} timeStamp
 */
export function calculateTimeDifference(timeStamp) {
  const time = Math.floor(new Date().getTime() / 1000);

  return Math.abs(time - timeStamp);
}
