import { FC, PropsWithChildren, useEffect, useRef, useState } from "react";

const AnimateOut: FC<PropsWithChildren> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isShown, setIsShown] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.intersectionRatio === 0) {
        setIsShown(false)
      } else {
        setIsShown(true)
      }
    });
    // @ts-ignore
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isShown ? 1 : 0,
        height: '100%'
      }}
    >
      {children}
    </div>
  )
}

export default AnimateOut
