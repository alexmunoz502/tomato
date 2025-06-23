"use client";
import { useAppContainer } from "@/contexts/AppContainerContext";
import { useState, useEffect, useRef } from "react";

type AppPageProps = {
  id: string;
  className?: string;
  children: React.ReactNode;
};

const AppPage: React.FC<AppPageProps> = ({
  id,
  className,
  children,
}: AppPageProps) => {
  const appContainer = useAppContainer();
  const ref = useRef<HTMLElement>(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const easedOpacity = Math.pow(entry.intersectionRatio, 8);
        setOpacity(easedOpacity);
      },
      {
        root: appContainer.containerRef.current || null,
        threshold: Array.from({ length: 20 }, (_, i) => i / 20),
      }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [appContainer.containerRef]);

  return (
    <section
      id={id}
      ref={ref}
      className={`
            pt-18 h-dvh snap-start flex flex-col
            ${className}
        `}
      style={{ opacity }}
    >
      {children}
    </section>
  );
};

export default AppPage;
