import { Dispatch, SetStateAction } from "react";

export type StateFn<T> = Dispatch<SetStateAction<T>>;
export type Timeline = gsap.core.Timeline;
export type TweenTarget = gsap.TweenTarget;
