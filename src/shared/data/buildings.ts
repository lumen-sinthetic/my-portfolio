import { useTranslations } from "next-intl";
import { useMemo } from "react";

export function useBuildingsData() {
  const t = useTranslations("data.buildings");

  const data = useMemo(
    () => [
      {
        id: 1,
        title: t("building-1.title"),
        description: t("building-1.description"),
        image: "/assets/img/home/buildings/building-1.png",
      },
      {
        id: 2,
        title: t("building-2.title"),
        description: t("building-2.description"),
        image: "/assets/img/home/buildings/building-2.png",
      },
      {
        id: 3,
        title: t("building-2.title"),
        description: t("building-2.description"),
        image: "/assets/img/home/buildings/building-3.png",
      },
      {
        id: 4,
        title: t("building-2.title"),
        description: t("building-2.description"),
        image: "/assets/img/home/buildings/building-4.png",
      },
    ],
    [t]
  );

  return { data };
}
