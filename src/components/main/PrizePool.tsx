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
    <p className="text-sm px-2 py-2 flex gap-1.5 items-center rounded-[10px] text-black shadow-[-6px_8px_12px_0px_rgba(0,0,0,0.25)]" style={{
      background: 'radial-gradient(88.37% 102.56% at 79.18% 13.75%, #76E6A0 0%, #38DA75 100%)'
    }}>
      <span>{won ? "Won:" : "Prizepool:"}</span>
      <span className="font-bold">{amount}</span>
      <span>$ARENA</span>
    </p>
    <div className="h-[1px] flex-grow bg-[#203F3B]" />
  </div>
);
