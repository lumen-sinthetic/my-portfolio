import { Headline } from "@components/atoms/headline";
import { cn } from "@shared/lib/utils";
import { MouseEventHandler } from "react";

interface PortfolioParagraphProps {
  onClick?: MouseEventHandler;
  title: string;
  index: number;
  activeIndex: number;
}

function PortfolioParagraph({
  onClick,
  title,
  index,
  activeIndex,
}: PortfolioParagraphProps) {
  return (
    <button
      type="button"
      className="advantage-thesis min-h-12 w-full group cursor-pointer relative"
      onClick={onClick}
    >
      <div className="size-full flex items-center justify-between gap-4 pr-4">
        <Headline
          className="my-2"
          size={"semi-sm"}
          as="h3"
        >
          <span className="font-semibold">
            {String(index + 1).padStart(2, "0")}
          </span>{" "}
          {title}
        </Headline>

        <div
          className={cn(
            "size-2 rounded-full bg-white transition-all duration-300",
            "scale-0 group-hover:scale-100",
            { "lg:scale-100": activeIndex === index }
          )}
        />
      </div>
      <div
        className={cn("aboslute inset-x-0 bottom-0 h-px bg-black/30", "w-full")}
      />

      <div
        className={cn(
          "aboslute inset-x-0 bottom-0 h-px bg-white",
          "transition-all duration-300 w-0 group-hover:w-full",
          { "lg:w-full": activeIndex === index }
        )}
      />
    </button>
  );
}

export default PortfolioParagraph;
