import { cn } from "@shared/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  disabled?: boolean;
  // dashboard?: boolean;
  // rightPadding?: boolean;
}

export function Container({
  children,
  disabled,
  className,
  // dashboard,
  // rightPadding,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        { "px-4 xs:px-8 sm:px-16 mx-auto w-full": !disabled },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
