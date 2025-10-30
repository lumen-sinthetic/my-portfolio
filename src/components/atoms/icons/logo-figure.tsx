import { ComponentProps } from "react";

function LogoFigure(props: ComponentProps<"svg">) {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 76.000000 58.000000"
      preserveAspectRatio="xMidYMid meet"
      fill="#fff"
      {...props}
    >
      <g
        transform="translate(0.000000,58.000000) scale(0.100000,-0.100000)"
        fill="currentColor"
        stroke="none"
      >
        <path
          d="M135 400 l-130 -130 133 -133 132 -132 130 130 130 130 -133 133
-132 132 -130 -130z"
        />
        <path
          d="M427 492 l-37 -38 90 -89 c50 -49 90 -94 90 -100 0 -5 -41 -50 -90
-100 l-90 -91 35 -34 35 -34 133 132 132 132 -130 130 -131 130 -37 -38z"
        />
      </g>
    </svg>
  );
}

export default LogoFigure;
