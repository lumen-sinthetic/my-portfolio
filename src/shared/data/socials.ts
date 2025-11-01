import Github from "@components/atoms/icons/contacts/github";
import Telegram from "@components/atoms/icons/contacts/telegram";
import WhatsApp from "@components/atoms/icons/contacts/whatsapp";
import { ComponentProps, FC } from "react";

export const socials: Array<{ link: string; icon: FC<ComponentProps<"svg">> }> =
  [
    {
      link: "https://github.com/lumen-sinthetic",
      icon: Github,
    },
    {
      link: "https://wa.me/77775296871",
      icon: WhatsApp,
    },
    {
      link: "https://t.me/lumenaeternam",
      icon: Telegram,
    },
  ];
