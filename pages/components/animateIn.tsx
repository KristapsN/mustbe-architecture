import { FC, PropsWithChildren, useRef } from "react";
import { useElementOnScreen } from "..";

const AnimateIn: FC<PropsWithChildren> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useElementOnScreen(ref);
  return (
    <div
      ref={ref}
      style={{
        opacity: onScreen ? 1 : 0,
        translate: onScreen ? "none" : "0 2rem",
        transition: "600ms ease-in-out",
      }}
    >
      {children}
    </div>
  )
}

export default AnimateIn
