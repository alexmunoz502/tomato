"use client";
import { useState, useEffect, useRef } from "react";

type PageProps = {
  id: string;
  className?: string;
  children: React.ReactNode;
  scrollContainerRef: React.RefObject<HTMLElement>;
};

const Page: React.FC<PageProps> = ({
  id,
  className,
  children,
  scrollContainerRef,
}: PageProps) => {
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
        root: scrollContainerRef.current || null,
        threshold: Array.from({ length: 20 }, (_, i) => i / 20),
      }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [scrollContainerRef]);

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

export default Page;
