import { cn } from "@shared/lib/utils";
import Image from "next/image";
import { forwardRef } from "react";

type ImageProps = Omit<
  Parameters<typeof Image>[0],
  "src" | "alt" | "className"
>;
interface LogoProps extends ImageProps {
  logoColor?: "normal" | "black" | "white";
  className?: string;
}

const Logo = forwardRef<HTMLImageElement, LogoProps>(
  ({ className, logoColor, ...props }, ref) => {
    return (
      <Image
        ref={ref}
        src="/assets/img/logo.png"
        alt="Logo"
        width={280}
        height={64}
        className={cn(
          "shrink-0 transition-all duration-300",
          {
            "grayscale brightness-[10]": logoColor === "white",
            "grayscale brightness-0": logoColor === "black",
          },
          className
        )}
        priority
        {...props}
      />
    );
  }
);

export default Logo;
