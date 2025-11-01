import { Badge } from "@components/atoms/badge";
import { Headline } from "@components/atoms/headline";
import { PortfolioItem } from "@shared/data/portfolio";
import { cn } from "@shared/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { forwardRef } from "react";

interface PortfolioCardProps {
  data: PortfolioItem;
  order: number;
}

const PortfolioCard = forwardRef<HTMLDivElement, PortfolioCardProps>(
  ({ data, order }, ref) => {
    return (
      <div
        className={cn(
          "advantage-wrapper w-full py-20",
          "grid place-items-center"
        )}
        ref={ref}
      >
        <div className="advantage-container w-full grid place-items-center">
          <figure className="advantage-figure relative steady-hover w-10/12">
            <Image
              width={1080}
              height={608}
              src={data.image}
              alt={data.name}
              className="advantage-image rounded-md w-full h-auto"
            />

            <div className="glass-panel !bg-black/40 p-8 absolute top-[80%] left-0 md:-left-12 flex gap-4 items-center">
              <div className="text-8xl hidden md:block">
                {String(order).padStart(2, "0")}
              </div>
              <div className="flex flex-col gap-3">
                <Headline asChild>
                  <Link
                    href={data.link}
                    rel="noindex nofollow"
                    target="_blank"
                    className="flex gap-2"
                  >
                    {data.name}

                    <ArrowUpRight />
                  </Link>
                </Headline>
                {data.description && <p>{data.description}</p>}
                {!!data.tags?.length && (
                  <div className="flex gap-3">
                    {data.tags.map((tag, index) => (
                      <Badge key={index}>{tag}</Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </figure>
        </div>
      </div>
    );
  }
);

PortfolioCard.displayName = "PortfolioCard";

export { PortfolioCard };
