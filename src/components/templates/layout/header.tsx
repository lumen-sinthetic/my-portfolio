"use client";

import { Container } from "@components/atoms/container";
import BurgerBtn from "@components/molecules/burger/burger-btn";
import BurgerMenu from "@components/molecules/burger/burger-menu";
import LangSwitcher from "@components/molecules/lang-switcher";
import { useUIContext } from "@core/context/ui-provider";
import { useScrollTreshold } from "@shared/lib/helpers/use-scroll-handle";
import { cn } from "@shared/lib/utils";
import { useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { headerState } = useUIContext();

  useScrollTreshold(setIsScrolled, 400);

  return (
    <>
      <header
        className={cn(
          "fixed w-full inset-x-0 h-24 z-50 flex items-center overflow-hidden transition-all !border-none"
        )}
      >
        <Container className="flex justify-between items-center">
          <BurgerBtn
            isOpen={isMenuOpen}
            setIsOpen={setIsMenuOpen}
          />
          <LangSwitcher />
        </Container>

        <div
          className={cn(
            "absolute inset-x-0 bottom-0 bg-white transition-all duration-300 h-px",
            {
              "scale-x-0": !isScrolled,
              "bg-black": headerState === "black" && !isMenuOpen,
            }
          )}
        />

        {/* <Link href={"/#home-hero"}>
          <Logo
            logoColor={
              headerState === "white" || isMenuOpen ? "white" : "black"
            }
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2",
              {
                "-translate-y-1/2": isScrolled,
                "-translate-y-40": !isScrolled,
              },
              "sm:block hidden"
            )}
          />

          <LogoFigure
            // logoColor={headerState === "white" || isMenuOpen ? "white" : "black"}
            className={cn(
              "absolute top-1/2 left-1/2 -translate-x-1/2 w-16",
              {
                "-translate-y-1/2": isScrolled,
                "-translate-y-40": !isScrolled,
                "fill-black": headerState === "black",
                "fill-white": headerState === "white",
              },
              "sm:hidden"
            )}
          />
        </Link> */}
      </header>
      <BurgerMenu
        isOpen={isMenuOpen}
        setIsOpen={setIsMenuOpen}
      />
    </>
  );
}

export default Header;
