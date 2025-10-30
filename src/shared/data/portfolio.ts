interface PortfolioItem {
  name: string;
  image: string;
  link: string;
  description?: string;
  tags?: string[];
}

export const portfolio: PortfolioItem[] = [
  {
    name: "Две палочки",
    link: "https://dve-palochky.kz/",
    image: "/assets/img/portfolio/dve.png",
    description: "Популярный сервис для доставки суши и пиццы в г. Алматы",
  },
  {
    name: "Aveco Energy",
    link: "http://avecoenergy.kz",
    image: "/assets/img/portfolio/aveco-1.png",
    description: "Интернет магазин компании Aveco Group",
  },
  {
    name: "Enjoy IT",
    link: "https://enjoyit.kz/",
    image: "/assets/img/portfolio/enjoy.png",
    description: "Корпоративный сайт компании EnjoyIT",
  },
  {
    name: "Lux FM",
    link: "https://luxfm.kz/",
    image: "/assets/img/portfolio/lux-fm.png",
    description: "Сайт для развлекательного радио №1",
  },
  {
    name: "Radio NS",
    link: "https://ns.kz/",
    image: "/assets/img/portfolio/radio-ns.png",
    description: "Сайт для популярной радиостанции в Казахстане",
  },
];
