import { ChevronLeft, ChevronRight } from "lucide-react";
import { RefObject } from "react";

interface SwiperProgressProps {
  activeSlide: number;
  totalSlides: number;
  progressBarRef: RefObject<HTMLDivElement | null>;
  prevEl?: string;
  nextEl?: string;
}

function SwiperProgress({
  activeSlide,
  totalSlides,
  progressBarRef,
  nextEl = "swiper-next",
  prevEl = "swiper-prev",
}: SwiperProgressProps) {
  return (
    <div className="md:bottom-10 bottom-11 right-1/2 transform translate-x-1/2 sm:transform-none sm:translate-x-0 autoplay-progress w-36 rounded-full border backdrop-blur-md z-10 h-12 absolute sm:bottom-12 sm:right-12 bg-transparent overflow-hidden">
      <div className="relative size-full flex items-center justify-between p-2 text-white">
        <button
          type="button"
          className={prevEl}
        >
          <ChevronLeft size={30} />
        </button>

        <div className="counter gap-1 flex">
          <div>{String(activeSlide + 1).padStart(2, "0")}</div>/
          <div>{String(totalSlides).padStart(2, "0")}</div>
        </div>

        <button
          type="button"
          className={nextEl}
        >
          <ChevronRight size={30} />
        </button>

        <div
          ref={progressBarRef}
          className="bg-white opacity-35 progress-bar h-full absolute top-0 left-0 bottom-0 -z-10"
        />
      </div>
    </div>
  );
}

export default SwiperProgress;
