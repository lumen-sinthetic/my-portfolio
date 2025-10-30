import * as React from "react";

import { cn } from "@shared/lib/utils";

interface HeadlessInputProps extends React.ComponentProps<"input"> {
  isError?: unknown;
}

const HeadlessInput = React.forwardRef<HTMLInputElement, HeadlessInputProps>(
  ({ className, isError, ...props }, ref) => {
    return (
      <input
        className={cn(
          "flex h-14 w-full text-lg border border-input bg-white px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
          { "!outline outline-1 outline-red-500": Boolean(isError) }
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

HeadlessInput.displayName = "HeadlessInput";

export { HeadlessInput };
