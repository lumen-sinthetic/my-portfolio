import { Badge } from "@components/atoms/badge";
import MuiIcon from "@components/atoms/icons/stack/mui-icon";
import NextIcon from "@components/atoms/icons/stack/next-icon";
import NuxtIcon from "@components/atoms/icons/stack/nuxt-icon";
import ReactIcon from "@components/atoms/icons/stack/react-icon";
import ScssIcon from "@components/atoms/icons/stack/scss-icon";
import ShadcnIcon from "@components/atoms/icons/stack/shadcn-logo";
import TailwindIcon from "@components/atoms/icons/stack/tailwind-icon";
import TypescriptIcon from "@components/atoms/icons/stack/typescript-icon";
import VueIcon from "@components/atoms/icons/stack/vue-icon";
import { ComponentProps, FC, ReactNode } from "react";

export const stack: Array<{
  name: string;
  icon: FC<ComponentProps<"svg">>;
  new?: boolean;
}> = [
  { name: "Typescript", icon: TypescriptIcon },
  { name: "React", icon: ReactIcon },
  { name: "Next.js", icon: NextIcon },
  { name: "Tailwind CSS", icon: TailwindIcon },
  { name: "SCSS", icon: ScssIcon },
  { name: "MUI", icon: MuiIcon },
  { name: "Shadcn", icon: ShadcnIcon },
  { name: "Vue", icon: VueIcon, new: true },
  { name: "Nuxt.js", icon: NuxtIcon, new: true },
];

export const aboutInfo: Array<{ title: string; content: ReactNode }> = [
  {
    title: "Обо мне",
    content: (
      <div>
        <p>
          Я front-end разработчик, специализирующийся на реализации
          UI/UX-дизайна. Для меня важен не только "фасад здания", но и то, как
          именно оно построено.
        </p>
        <ul className="mt-3 list-disc pl-6">
          <li>Люблю декомпозицию и переиспользуемость.</li>
          <li>Получаю удовольствие от чистого кода.</li>
          <li>
            Верю, что успех проекта заключается не только в красивом UI, но и в
            грамотном ведении кодовой базы.
          </li>
          <li>
            Считаю, что простой, понятный и расширяемый код - это произведение
            искусства.{" "}
            <span className="italic">«Простота - признак истины»</span>.
          </li>
        </ul>
        <p className="mt-3">
          В свободное время увлекаюсь играми 🎮 и аниме 🌸.
        </p>
      </div>
    ),
  },
  {
    title: "Стек технологий",
    content: (
      <ul className="grid grid-cols-3 gap-4">
        {stack.map((item, index) => (
          <li
            className="flex gap-2"
            key={index}
          >
            <item.icon className="fill-white size-8" /> - {item.name}
            {item.new && <Badge variant={"secondary"}>New</Badge>}
          </li>
        ))}
      </ul>
    ),
  },
];
