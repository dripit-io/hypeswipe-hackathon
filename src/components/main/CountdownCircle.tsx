import { cn } from "@/lib";
import React, { useEffect, useState } from "react";

interface CountdownProps {
  className?: string;
  startDate: number; // timestamp in ms
  endDate: number; // timestamp in ms
}

const radius = 100;
const stroke = 15;
const normalizedRadius = radius - stroke / 2;
const circumference = normalizedRadius * 2 * Math.PI;

function formatTime(ms: number) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0"
  );
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return { hours, minutes, seconds };
}

export const CountdownCircle: React.FC<CountdownProps> = ({
  className,
  startDate,
  endDate,
}) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const total = endDate - startDate;
  const remaining = Math.max(0, endDate - now);
  const elapsed = Math.min(1, (now - startDate) / total);
  const progress = circumference * (1 - elapsed);

  const { hours, minutes, seconds } = formatTime(remaining);

  return (
    <div
      className={cn("relative", className)}
      style={{ width: 2 * radius, height: 2 * radius }}
    >
      <svg width={2 * radius} height={2 * radius}>
        <circle
          stroke="#33323a"
          fill="none"
          strokeWidth={stroke}
          cx={radius}
          cy={radius}
          r={normalizedRadius}
        />
        <circle
          stroke="#8fffcf"
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          style={{
            transformOrigin: "center",
            transform: "rotate(-90deg)",
            transition: "stroke-dashoffset 1s linear",
          }}
        />
      </svg>
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-full h-full p-6"
        )}
      >
        <div
          className={cn(
            "w-full h-full text-center bg-white/10 rounded-full",
            "flex items-center justify-center flex-col"
          )}
        >
          <div className="flex gap-2">
            <p className="flex flex-col items-center">
              <span className="text-lg">{hours}</span>
              <span className="text-[9px]">hours</span>
            </p>
            <span>:</span>
            <p className="flex flex-col items-center">
              <span className="text-lg">{minutes}</span>
              <span className="text-[9px]">mins</span>
            </p>
            <span>:</span>
            <p className="flex flex-col items-center">
              <span className="text-lg">{seconds}</span>
              <span className="text-[9px]">secs</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
