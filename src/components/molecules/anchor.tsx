"use client";

import { useLenis } from "@core/context/LenisProvider";
import { useUIContext } from "@core/context/ui-provider";
import { useScrollTreshold } from "@shared/lib/helpers/use-scroll-handle";
import { cn } from "@shared/lib/utils";
import { ArrowUp } from "lucide-react";
import { useState } from "react";

function Anchor() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { headerState } = useUIContext();
  const lenis = useLenis();

  useScrollTreshold(setIsScrolled, 600);

  return (
    <button
      type="button"
      className={cn(
        "top-anchor glass-panel",
        "fixed bottom-10 right-10 z-50 size-12",
        "grid place-items-center transition-all duration-300",
        {
          "translate-y-20 opacity-0": !isScrolled,
          "text-black border": headerState === "black",
        }
      )}
      onClick={() => lenis?.scrollTo(0)}
    >
      <ArrowUp className="size-6" />
    </button>
  );
}

export default Anchor;
