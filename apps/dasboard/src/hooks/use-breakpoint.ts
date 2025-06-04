import { useEffect, useState } from "react";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

const breakpoints: Record<Breakpoint, number> = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

const getBreakpoint = (width: number): Breakpoint => {
  const entries = Object.entries(breakpoints) as [Breakpoint, number][];
  return (
    entries.reverse().find(([, minWidth]) => width >= minWidth)?.[0] || "xs"
  );
};

const useBreakpoint = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() =>
    typeof window !== "undefined" ? getBreakpoint(window.innerWidth) : "md"
  );

  useEffect(() => {
    const handleResize = () => {
      const newBreakpoint = getBreakpoint(window.innerWidth);
      setBreakpoint(newBreakpoint);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // for SSR/initial render

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
};

export default useBreakpoint;
