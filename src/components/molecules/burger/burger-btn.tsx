import { useUIContext } from "@core/context/ui-provider";
import { cn } from "@shared/lib/utils";
import { StateFn } from "@shared/types/abbreviations";
import { useTranslations } from "next-intl";

interface BurgerBtnProps {
  isOpen: boolean;
  setIsOpen: StateFn<boolean>;
}

function BurgerBtn({ isOpen, setIsOpen }: BurgerBtnProps) {
  const { headerState } = useUIContext();

  const t = useTranslations("common.ui");

  return (
    <button
      type="button"
      onClick={() => setIsOpen(prev => !prev)}
      className={cn(
        "flex gap-4 text-xl font-normal shrink-0",
        "transition-colors duration-300 gap-4",
        { "text-black": headerState === "black" && !isOpen }
      )}
    >
      <div className="burger flex flex-col w-14 justify-between">
        <div
          className={cn(
            "w-full h-1 bg-white",
            "transition-all duration-300 origin-left",
            {
              "rotate-[16.6deg]": isOpen,
              "bg-black": !isOpen && headerState === "black",
            }
          )}
        />
        <div
          className={cn(
            "w-full h-1 bg-white",
            "transition-all duration-300 origin-left",
            {
              "-rotate-[16.6deg]": isOpen,
              "bg-black": !isOpen && headerState === "black",
            }
          )}
        />
      </div>
      <span className="uppercase leading-none">{t("menu")}</span>
    </button>
  );
}

export default BurgerBtn;
