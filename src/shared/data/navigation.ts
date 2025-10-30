import { useTranslations } from "next-intl";
import { useMemo } from "react";

export interface NavigationItem {
  name: string;
  href: string;
}

export function useNavigationLinks() {
  const t = useTranslations("navigation");

  const mainNavigation: NavigationItem[] = useMemo(
    () => [
      { name: t("home"), href: "/" },
      { name: t("business-center"), href: "/business" },
      { name: t("rent"), href: "/rent" },
      { name: t("reviews"), href: "/reviews" },
      { name: t("contacts"), href: "/contacts" },
    ],
    [t]
  );

  return { mainNavigation };
}
