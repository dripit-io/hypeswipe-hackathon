import React from "react";

export const RadialGradient: React.FC = () => (
  <div
    className="fixed inset-0 pointer-events-none left-[50%] -translate-x-1/2 w-[calc(100%_*_2.34)]"
    style={{
      background:
        "radial-gradient(circle at center 120%, rgba(118, 230, 160, 0.12) 35%, transparent 70%)",
    }}
  />
);
