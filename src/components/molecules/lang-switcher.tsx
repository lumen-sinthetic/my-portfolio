"use client";

import { useUIContext } from "@core/context/ui-provider";
import { locales } from "@core/locale/exports/data";
import { usePathname, useRouter } from "@core/locale/i18n/navigation";
import { cn } from "@shared/lib/utils";
import { useLocale } from "next-intl";

function LangSwitcher() {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { headerState } = useUIContext();

  return (
    <div className="flex gap-2">
      {locales.map((locale, index) => (
        <button
          key={index}
          type="button"
          onClick={() => router.push(pathname, { locale, scroll: false })}
          className={cn("uppercase size-10 grid place-items-center", {
            "glass-panel pointer-events-none": locale === currentLocale,
            "text-black": headerState === "black",
          })}
          tabIndex={locale === currentLocale ? -1 : 0}
          aria-disabled={locale === currentLocale}
          disabled={locale === currentLocale}
        >
          {locale}
        </button>
      ))}
    </div>
  );
}

export default LangSwitcher;
