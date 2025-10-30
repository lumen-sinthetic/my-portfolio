import dynamic from "next/dynamic";

const Particles = dynamic(() =>
  import("@components/molecules/backgrounds/particles").then(mod => mod.default)
);

function StandartBg() {
  return (
    <div className="h-screen !fixed top-0 left-0 -z-10 bg-black w-full">
      <Particles
        particleCount={170}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
        className="size-full"
      />
    </div>
  );
}

export default StandartBg;
