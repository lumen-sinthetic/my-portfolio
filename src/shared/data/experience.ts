export interface ExperienceItem {
  companyName: string;
  companyLogo: string;
  position: string;
  jobSpan: [Date, Date];
  achievements: string[];
  stack: string[];
}

export const experience: ExperienceItem[] = [
  {
    companyName: "init.kz",
    companyLogo: "/assets/img/logos/init-logo.jpg",
    jobSpan: [new Date(2022, 10), new Date(2025, 10)],
    position: "Front-end разработчик",
    achievements: [
      "Разработал фронтенд для сайта компании Dve Palochky - крупного сервиса доставки суши и пиццы.",
      "Создал унифицированный шаблон для Front-end приложений, ускорив запуск новых проектов.",
      "Внедрил стандарты компонентной архитектуры на базе Atomic Design с использованием shadcn/ui.",
      "Оптимизировал загрузку страниц с различными вариациями контента, что сократило время рендеринга.",
      "Разработал компактные UI-библиотеки для сложных интерфейсных компонентов.",
      "Провёл рефакторинг админ-панелей, улучшив читаемость и переиспользуемость кода.",
    ],
    stack: [
      "Next.js",
      "React",
      "Typescript",
      "REST",
      "Tailwind",
      "Shadcn",
      "GSAP",
      "SCSS",
      "MUI",
    ],
  },
];
