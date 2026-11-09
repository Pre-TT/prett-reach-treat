import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "h2" | "p";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = Tag as "div";

  return (
    <Comp
      ref={ref}
      className={cn("reveal", shown && "reveal-in", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Comp>
  );
}

export function SectionTitle({
  eyebrow,
  children,
  className,
}: {
  eyebrow?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={cn("group", className)}>
      {eyebrow ? <p className="eyebrow mb-3 text-ink">{eyebrow}</p> : null}
      <h2 className="title-underline text-4xl font-semibold sm:text-5xl">
        {children}
        <span className="absolute -bottom-3 left-0 h-[3px] w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-out group-hover:scale-x-100 group-[.reveal-in]:scale-x-100" />
      </h2>
    </Reveal>
  );
}
