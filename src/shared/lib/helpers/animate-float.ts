import gsap from "gsap";

interface AnimationParams {
  duration?: number | [number, number];
  intensity?: number | [number, number];
}

export function animateFloat(
  target: gsap.TweenTarget,
  params?: AnimationParams
) {
  if (typeof window === "undefined")
    return { killTweens: () => {}, tl: undefined };

  const { duration = 5, intensity = 1 } = params || {};

  const calculatedDuration = Array.isArray(duration)
    ? gsap.utils.random(...duration)
    : duration;

  const calculatedIntensity = Array.isArray(intensity)
    ? gsap.utils.random(...intensity)
    : intensity;

  const tl = gsap.timeline({
    defaults: { duration: calculatedDuration, ease: "sine.inOut" },
    repeat: -1,
    yoyo: true,
  });

  gsap.set(target, {
    y: 15 * calculatedIntensity,
    x: gsap.utils.random(-5, 5) * calculatedIntensity, // gentle horizontal drift
    rotation: gsap.utils.random(-2, 2), // tiny tilt
    scale: 1.01,
  });

  tl.to(target, {
    y: 15 * calculatedIntensity,
    x: gsap.utils.random(-5, 5) * calculatedIntensity, // gentle horizontal drift
    rotation: gsap.utils.random(-2, 2), // tiny tilt
    scale: 1.01, // breathing effect
  }).to(target, {
    y: -15 * calculatedIntensity,
    x: gsap.utils.random(-5, 5) * calculatedIntensity,
    rotation: gsap.utils.random(-2, 2),
    scale: 0.99,
  });

  // if (gsap.utils.random(1, 10) > 5) tl.reverse();

  return { tl, killTweens: () => gsap.killTweensOf(target) };
}

export type FloatAnimation = ReturnType<typeof animateFloat>;

export function cleanupFloatAnimation(
  animation: Array<FloatAnimation> | FloatAnimation
) {
  if (Array.isArray(animation)) {
    animation.forEach(animation => {
      animation.tl?.kill();
      // animation.killTweens();
    });
    return;
  }

  animation.tl?.kill();
  // animation.killTweens();
}
