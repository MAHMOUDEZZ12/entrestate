
"use client";

import { cn } from "@/lib/utils"
import React from "react";
import { Button, ButtonProps } from "./button";

export const ShinyButton = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        {...props}
        className={cn(
          "relative overflow-hidden group",
          "text-lg py-7 px-8",
          "bg-primary text-primary-foreground hover:bg-primary/90",
          className
        )}
      >
        <span className="relative z-10">{props.children}</span>
        <span
          className={cn(
            "absolute inset-0 block",
            "bg-[radial-gradient(150%_150%_at_50%_100%,hsl(var(--primary-foreground))_20%,transparent_80%)]",
            "opacity-0 transition-opacity duration-500 group-hover:opacity-30"
          )}
        />
      </Button>
    )
});
ShinyButton.displayName = "ShinyButton";
