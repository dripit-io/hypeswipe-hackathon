import React from "react";
import { MusicIcon } from "lucide-react";
import {
  motion,
  useMotionValue,
  useTransform,
  MotionValue,
} from "framer-motion";

import { cn } from "@/lib";
import type { Artist } from "@/types";

const SWIPE_THRESHOLD = 130;

interface SwipeCardProps extends Artist {
  isFirst: boolean;
  isSecond: boolean;
  x?: MotionValue<number>;
  y?: MotionValue<number>;
  onSwipe: (isRight: boolean) => void;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({
  name,
  images,
  country,
  genre,
  isFirst,
  isSecond,
  x: externalX,
  y: externalY,
  onSwipe,
}) => {
  const internalX = useMotionValue(0);
  const internalY = useMotionValue(0);
  const x = externalX || internalX;
  const y = externalY || internalY;
  const image = React.useMemo(() => images[0].url, [images]);

  const opacity = useTransform(
    x,
    [-300, -100, 0, 100, 300],
    [0, 0.9, 1, 0.9, 0]
  );

  return (
    <motion.div
      className={cn(
        "aspect-[69/108] w-[87.5%] max-w-[420px] rounded-3xl bg-slate-800 object-cover",
        "relative z-[8] overflow-hidden hover:cursor-grab active:cursor-grabbing",
        { "z-10": isFirst, "z-[9]": isSecond }
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
      }}>
      <img src={image} alt={name} className="h-full w-full object-cover" />
      <div
        className={cn(
          "absolute bottom-12 left-1/2 w-[calc(100%-16px)] -translate-x-1/2 rounded-3xl",
          "flex justify-between bg-white/15 p-4 backdrop-blur-[50px]"
        )}>
        <div>
          <p className="mb-1 font-bold">{name}</p>
          <p className="text-xs">{country ?? "Worldwide"}</p>
        </div>
        {genre && (
          <div className="flex items-center gap-1 self-start rounded-3xl bg-white/20 p-1.5">
            <MusicIcon className="size-3" />
            <p className="text-xs">{genre}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
