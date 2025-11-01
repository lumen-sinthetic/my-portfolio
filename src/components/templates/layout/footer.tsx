import { Container } from "@components/atoms/container";
import { socials } from "@shared/data/socials";
import Link from "next/link";

function Footer({ date }: { date: Date }) {
  return (
    <footer className="py-8">
      <Container className="flex justify-between">
        <div className="socials flex gap-8">
          {socials.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              target="_blank"
              rel="noindex nofollow"
            >
              <item.icon className="fill-black size-10" />
            </Link>
          ))}
        </div>

        <div className="font-medium text-right mr-10">
          Сделано с ❤️ на базе Next.js и Tailwind CSS <br />©{" "}
          {date.getFullYear()}
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
