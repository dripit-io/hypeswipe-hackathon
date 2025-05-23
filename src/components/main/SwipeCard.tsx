import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

import { cn } from "@/lib";

const SWIPE_THRESHOLD = 130;

interface SwipeCardProps {
  name: string;
  image: string;
  isFirst: boolean;
  isSecond: boolean;
  onSwipe: (isRight: boolean) => void;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({
  name,
  image,
  isFirst,
  isSecond,
  onSwipe,
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useTransform(
    x,
    [-300, -100, 0, 100, 300],
    [0, 0.9, 1, 0.9, 0]
  );

  return (
    <motion.img
      src={image}
      alt={name}
      className={cn(
        "w-[87.5%] max-w-[420px] aspect-[69/108] rounded-3xl bg-slate-800 object-cover",
        "hover:cursor-grab active:cursor-grabbing",
        { "z-10": isFirst }
      )}
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        y,
        opacity,
        transition: "0.125s transform",
        boxShadow: isFirst
          ? "-8px -8px 15px 0px rgba(0, 0, 0, 0.5)"
          : undefined,
      }}
      animate={{
        scale: isFirst ? 1 : isSecond ? 0.9 : 0.8,
        translateY: isFirst ? 0 : isSecond ? -40 : -80,
      }}
      drag={isFirst}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      whileDrag={{ scale: 1.1 }}
      onDragEnd={() => {
        if (Math.abs(x.get()) > SWIPE_THRESHOLD) {
          onSwipe(x.get() > 0);
        } else {
          x.set(0);
          y.set(0);
        }
      }}
    />
  );
};
