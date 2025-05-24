import React from "react";

interface PrizePoolProps {
  amount: number;
  won?: boolean;
}

export const PrizePool: React.FC<PrizePoolProps> = ({
  amount,
  won = false,
}) => (
  <div className="flex justify-between items-center gap-2 my-8">
    <div className="h-[1px] flex-grow bg-[#203F3B]" />
    <p className="text-sm px-2 py-1 flex gap-1.5 items-center rounded-xl bg-green-400 text-black">
      <span>{won ? "Won:" : "Prizepool:"}</span>
      <span className="font-bold">{amount}</span>
      <span>$ARENA</span>
    </p>
    <div className="h-[1px] flex-grow bg-[#203F3B]" />
  </div>
);
