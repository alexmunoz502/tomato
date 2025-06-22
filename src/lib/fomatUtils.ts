export const formatTime = (time_seconds: number) => {
  const minutes = Math.floor(time_seconds / 60);
  const seconds = time_seconds % 60;

  const pad = (n: number) => String(n).padStart(2, "0");

  return `${pad(minutes)}:${pad(seconds)}`;
};

export const minutesToSeconds = (minutes: number) => {
  return minutes * 60;
};
