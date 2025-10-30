import { Button } from "@components/atoms/button";
import { Headline } from "@components/atoms/headline";
import { cn } from "@shared/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface BuildingCardProps {
  title: string;
  description: string;
  image: string;
}

function BuildingCard({ description, image, title }: BuildingCardProps) {
  return (
    <div
      className={cn(
        "building-card grid place-items-center text-center",
        "relative group overflow-hidden min-h-80"
      )}
    >
      <Image
        src={image}
        alt={title}
        width={800}
        height={500}
        className="absolute size-full inset-0 group-hover:scale-105 transition-all duration-500 object-cover"
      />
      <div
        className={cn(
          "absolute inset-0 bg-black/30 z-10",
          "lg:opacity-0 group-hover:opacity-100 transition-all duration-300"
        )}
      />

      <div
        className={cn(
          "relative flex flex-col gap-4 min-w-48 text-white z-20",
          "lg:opacity-0 group-hover:opacity-100 transition-all duration-300",
          "lg:translate-y-12 group-hover:translate-y-0"
        )}
      >
        <Headline
          as="h3"
          className="uppercase"
        >
          {title}
        </Headline>
        <Headline
          as="h4"
          size={"semi-sm"}
        >
          {description}
        </Headline>
        <hr className="border-white w-3/4 mx-auto" />
        <Button
          asChild
          variant={"outline"}
        >
          <Link href={"/"}>Узнать больше</Link>
        </Button>
      </div>
    </div>
  );
}

export default BuildingCard;
