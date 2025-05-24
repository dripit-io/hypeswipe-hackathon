import React from "react";
import { LoaderCircleIcon } from "lucide-react";

import {
  Button as ShadButton,
  type ButtonProps as ShadButtonProps,
} from "@/components/ui/button";
import { cn } from "@/lib";

export interface ButtonProps extends ShadButtonProps {
  loading?: boolean;
  className?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, loading, className, disabled, ...props }, ref) => (
    <ShadButton
      ref={ref}
      className={cn(
        "relative overflow-hidden [&>*:not(:first-child)]:z-[1]",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      <span
        className={cn(
          "absolute left-0 top-0 z-[2] flex h-full w-full items-center justify-center bg-inherit opacity-0 transition-opacity duration-150",
          {
            "opacity-100": loading,
          }
        )}
      >
        <LoaderCircleIcon className="size-10 animate-spin" />
      </span>
      {children}
    </ShadButton>
  )
);
