"use client";
import { useState, useEffect } from "react";
import { eventBus } from "@/lib/eventBus";
import { formatTime } from "@/lib/fomatUtils";
import Image from "next/image";
import { isNotificationSupported } from "@/lib/browserUtils";

const EVENT_TIMEOUT = "timeout";

type TimerProps = {
  waitTime: number;
  onTimeout?: () => void;
};

const Timer: React.FC<TimerProps> = ({
  waitTime = 5,
  onTimeout,
}: TimerProps) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(waitTime);

  const decrementTimeLeft = () => {
    setTimeLeft((previousTimeLeft) => previousTimeLeft - 1);
  };

  const toggleRunning = () => {
    requestPermission();
    if (timeLeft === 0) resetTimer();
    setIsRunning(!isRunning);
  };

  const handleStop = () => {
    setTimeLeft(waitTime);
    setIsRunning(false);
  };

  const requestPermission = () => {
    if (isNotificationSupported()) {
      Notification.requestPermission().then((result) => {
        console.log("Notification permission: ", result);
      });
    } else {
      console.log("Notifications not supported on this platform.");
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(waitTime);
  };

  useEffect(() => {
    if (!isRunning) setTimeLeft(waitTime);
  }, [waitTime]);

  const handleTimeout = () => {
    try {
      if (Notification.permission === "granted") {
        new Notification("Time's up!", { body: "Your timer has completed." });
      }
    } catch (error) {
      console.warn("Nofication failed: ", error);
    }

    onTimeout && onTimeout();
    eventBus.emit(EVENT_TIMEOUT);
    resetTimer();
  };

  useEffect(() => {
    if (!isRunning) return;

    if (timeLeft === 0) return handleTimeout();

    const timeoutId = setTimeout(decrementTimeLeft, 1000);
    return () => clearTimeout(timeoutId);
  }, [timeLeft, isRunning]);

  return (
    <div className="flex flex-col items-center gap-8">
      <span
        className={`text-8xl font-heading
          ${
            isRunning
              ? "text-base-content-100 animate-jiggle"
              : "text-base-content-100/70"
          }
          `}
      >
        {formatTime(timeLeft)
          .split("")
          .map((char, i) => (
            <span
              key={i}
              className={`inline-block ${
                char === ":" ? "w-8 -translate-y-2" : "w-14"
              }  text-center`}
            >
              {char}
            </span>
          ))}
      </span>
      <div className="flex gap-4 justify-center">
        <button
          onMouseDown={toggleRunning}
          className={`
                transition-transform duration-150 ease-in-out hover:scale-110 active:scale-75
                hover:cursor-pointer
            `}
        >
          {isRunning ? (
            <Image
              src="/buttons/pause.png"
              width={64}
              height={64}
              alt="Pause Button"
            />
          ) : (
            <Image
              src="/buttons/play.png"
              width={64}
              height={64}
              alt="Start Button"
            />
          )}
        </button>
        <button
          onMouseDown={handleStop}
          aria-disabled={
            (timeLeft === waitTime || timeLeft === 0) && !isRunning
          }
          className={`
                transition-transform duration-150 ease-in-out active:scale-75
            ${
              (timeLeft === waitTime || timeLeft === 0) && !isRunning
                ? "opacity-25 pointer-events-none"
                : "opacity-100 hover:cursor-pointer hover:scale-110 "
            }
            `}
        >
          <Image
            src="/buttons/stop.png"
            width={64}
            height={64}
            alt="Stop Button"
          />
        </button>
      </div>
    </div>
  );
};

export default Timer;
