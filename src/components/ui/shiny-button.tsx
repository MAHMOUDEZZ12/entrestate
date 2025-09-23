
"use client";

import { cn } from "@/lib/utils"
import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";

export const ShinyButton = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        {...props}
        className={cn(
          "relative overflow-hidden group",
          "text-lg py-7 px-8",
          "bg-gradient-to-r from-primary via-primary to-accent text-primary-foreground hover:shadow-2xl hover:shadow-primary/30 transition-shadow duration-300",
          className
        )}
      >
        <span className="relative z-10 flex items-center gap-2">{props.children}</span>
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
