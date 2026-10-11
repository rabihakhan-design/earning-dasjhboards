import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

const SELECTORS = [
  ".section",
  ".reviews",
  ".card",
  ".plan",
  ".step",
  ".faq",
  ".promo",
  ".gen",
  ".stats",
  ".photo-band",
  ".page-hero",
  ".page h1",
  ".lead",
  ".form",
  ".search",
].join(",");

export default function Reveal() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(SELECTORS));
    const io = new IntersectionObserver(
      (es) =>
        es.forEach(
          (e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))
        ),
      { threshold: 0.08 }
    );
    els.forEach((el, i) => {
      el.classList.add("reveal");
      (el as HTMLElement).style.transitionDelay = `${Math.min(i % 6, 5) * 70}ms`;
      io.observe(el);
    });
    return () => io.disconnect();
  }, [path]);
  return null;
}
