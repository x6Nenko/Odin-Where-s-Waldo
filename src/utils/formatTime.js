// Convert total seconds to hh:mm:ss:ms format
export const formatTime = (totalSeconds) => {
  const ms = (totalSeconds % 100).toString().padStart(2, '0');
  const seconds = Math.floor((totalSeconds / 100) % 60).toString().padStart(2, '0');
  const minutes = Math.floor((totalSeconds / 6000) % 60).toString().padStart(2, '0');
  const hours = Math.floor(totalSeconds / 360000).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}:${ms}`;
};

export function timeStringToMilliseconds(timeString) {
  const [hours, minutes, seconds, milliseconds] = timeString.split(':').map(Number);
  return (
    hours * 60 * 60 * 1000 +
    minutes * 60 * 1000 +
    seconds * 1000 +
    milliseconds
  );
}
