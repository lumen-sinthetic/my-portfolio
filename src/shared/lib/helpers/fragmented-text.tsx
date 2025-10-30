import { Fragment } from "react";
import { cn } from "../utils";

interface FragmentedTextOptions {
  className?: string;
  fragmentationMethod?: "letters" | "words";
  element?: "span" | "div";
}

function fragmentedText(text: string, options?: FragmentedTextOptions) {
  const {
    className,
    fragmentationMethod = "letters",
    element: Comp = "span",
  } = options || {};
  const array = text.split(fragmentationMethod === "letters" ? "" : " ");

  return array.map((item, index) => (
    <Fragment key={index}>
      <Comp
        key={index}
        className={cn("text-part inline-block", className)}
      >
        {item || " "}
      </Comp>
      {(fragmentationMethod === "words" || item === " ") && " "}
    </Fragment>
  ));
}

export default fragmentedText;
