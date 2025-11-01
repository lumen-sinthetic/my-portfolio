import { Slot } from "@radix-ui/react-slot";
import { cn } from "@shared/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, ReactNode, forwardRef } from "react";

type ElementType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const headlineSizes = cva("", {
  variants: {
    size: {
      none: "",
      sm: "text-base sm:text-lg 3xl:text-xl",
      "semi-sm": "text-lg xs:text-xl 2xl:text-2xl",
      md: "text-xl xs:text-2xl sm:text-3xl 2xl:text-4xl",
      lg: "text-2xl xs:text-3xl sm:text-4xl md:text-5xl",
      xl: "text-3xl xs:text-4xl sm:text-5xl 2xl:text-6xl 3xl:text-7xl",
      "2xl": "text-4xl xs:text-5xl sm:text-7xl 2xl:text-8xl",
      "3xl": "text-4xl 2xs:text-5xl xs:text-6xl lg:text-9xl 2xl:text-[15rem]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface HeadlineProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headlineSizes> {
  as?: ElementType;
  asChild?: boolean;
  children?: ReactNode;
}

const Headline = forwardRef<HTMLHeadingElement, HeadlineProps>(
  ({ as: Tag = "h2", size, className, children, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : Tag;

    return (
      <Comp
        ref={ref}
        className={cn(headlineSizes({ size, className }))}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Headline.displayName = "Headline";

export { Headline };
