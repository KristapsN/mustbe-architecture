import { FC, PropsWithChildren, useEffect, useRef, useState } from "react";

const AnimateIn: FC<PropsWithChildren> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [isShown, setIsShown] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    });
    // @ts-ignore
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  if (isIntersecting && !isShown) {
    setIsShown(isIntersecting)
  }

  return (
    <div
      ref={ref}
      style={{
        opacity: isShown ? 1 : 0,
        translate: isShown ? "none" : "0 2rem",
        transition: "600ms ease-in-out",
        height: '100%'
      }}
    >
      {children}
    </div>
  )
}

export default AnimateIn
