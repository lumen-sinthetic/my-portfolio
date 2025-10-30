import { Button } from "@components/atoms/button";
import { cn } from "@shared/lib/utils";
import { Timeline } from "@shared/types/abbreviations";
import gsap from "gsap";
import {
  ComponentProps,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

interface ButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
  icon: ReactNode;
}

function TransitionButton({
  children,
  icon,
  className,
  ...props
}: ButtonProps) {
  const [isHover, setisHover] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  const tlRef = useRef<Timeline>(null);

  useLayoutEffect(() => {
    if (!buttonRef.current) return;

    console.log("init");

    if (!tlRef.current) {
      tlRef.current = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.inOut" },
      });

      tlRef.current.fromTo(
        maskRef.current,
        { clipPath: "inset(0% 0 0 0)" },
        { clipPath: "inset(100% 0 0 0)", duration: 0.4 },
        ">"
      );

      tlRef.current.to(
        buttonRef.current.querySelectorAll(".button-text"),
        { translateX: 40, duration: 0.5 },
        "<"
      );

      tlRef.current
        .to(
          buttonRef.current.querySelectorAll(".button-icon"),
          { translateX: 50, duration: 0.6 },
          "<"
        )
        .to(
          buttonRef.current.querySelectorAll(".hidden-icon"),
          { translateX: "320%", duration: 1 },
          "<"
        );
    }

    return () => {
      tlRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    if (!tlRef.current) return;

    if (isHover) {
      tlRef.current.play();
    } else {
      tlRef.current.reverse();
    }
  }, [isHover]);

  return (
    <Button
      ref={buttonRef}
      size={"default"}
      variant={"none"}
      onMouseEnter={() => setisHover(true)}
      onMouseLeave={() => setisHover(false)}
      className={cn(
        "bg-white relative justify-start overflow-hidden pr-14 pl-8",
        className
      )}
      {...props}
    >
      <Button
        size={"default"}
        variant={"none"}
        asChild
      >
        <div
          ref={maskRef}
          className={cn(
            "absolute inset-0 bg-black text-white z-10 justify-start overflow-hidden pr-14 pl-8"
          )}
        >
          <div className="hidden-icon absolute -left-12 flex-none">{icon}</div>
          <div className="button-text flex-1">{children}</div>
          <div className="button-icon absolute right-5 flex-none">{icon}</div>
        </div>
      </Button>

      <div className="hidden-icon absolute -left-12 flex-none">{icon}</div>
      <div className="button-text text-black flex-1">{children}</div>
      <div className="button-icon text-black absolute right-5 flex-none">
        {icon}
      </div>
    </Button>
  );
}

export default TransitionButton;
