export const isNotificationSupported = (): boolean => {
  return (
    "Notification" in window &&
    typeof Notification.requestPermission === "function"
  );
};
