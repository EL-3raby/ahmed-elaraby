"use client";

import {
  type CSSProperties,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type JourneyItem = {
  id: string;
  year: string;
  month: string;
  content: string;
  position: "top" | "bottom";
};

export type TimelineProps = {
  title?: string;
  periodLabel?: string;
  textColor?: string;
  mutedTextColor?: string;
  activeColor?: string;
  backgroundColor?: string;
  imageUrl?: string;
  imageAlt?: string;
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );
}

export const defaultJourneyData: JourneyItem[] = [
  {
    id: "step-01",
    year: "01",
    month: "Plan & Architecture",
    content: "We analyze your project goals, design clean database structures, and build a solid technical foundation.",
    position: "top",
  },
  {
    id: "step-02",
    year: "02",
    month: "Modern UI & Frontend",
    content: "We build fast, responsive interfaces designed to give your users a smooth, engaging experience on every screen.",
    position: "bottom",
  },
  {
    id: "step-03",
    year: "03",
    month: "Backend & API Integration",
    content: "We develop secure server logic, connect fast APIs, and ensure your data flows smoothly and safely.",
    position: "top",
  },
  {
    id: "step-04",
    year: "04",
    month: "Testing & Deployment",
    content: "We test speed, security, and performance, then launch your project cleanly with zero downtime.",
    position: "bottom",
  },
];

export default function Timeline({
  title = "HOW WE WORK",
  periodLabel = "(PROCESS)",
  textColor = "var(--fg, #F4F3EF)",
  mutedTextColor = "var(--muted, #8E8D8A)",
  activeColor = "var(--accent, #FF4D00)",
  backgroundColor = "transparent",
}: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wholeSliderRef = useRef<HTMLDivElement>(null);
  const journeyLineRef = useRef<HTMLDivElement>(null);
  const howWeRef = useRef<HTMLSpanElement>(null);
  const processTagRef = useRef<HTMLSpanElement>(null);
  const workRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const items = defaultJourneyData;

  const sectionStyle: CSSProperties = {
    color: textColor,
    backgroundColor,
  };
  const activeStyle: CSSProperties = {
    backgroundColor: activeColor,
  };
  const mutedTextStyle: CSSProperties = {
    color: mutedTextColor,
  };

  useEffect(() => {
    const container = containerRef.current;
    const slider = wholeSliderRef.current;
    const journeyLine = journeyLineRef.current;
    if (!container || !slider) return;

    const ctx = gsap.context(() => {
      // Entrance animation for HOW WE WORK according to positions:
      // HOW WE (top-left) enters from top-left
      if (howWeRef.current) {
        gsap.fromTo(
          howWeRef.current,
          {
            x: -60,
            y: -40,
            opacity: 0,
            filter: "blur(10px)",
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.0,
            ease: "power4.out",
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // (PROCESS) tag scales in with tracking expand
      if (processTagRef.current) {
        gsap.fromTo(
          processTagRef.current,
          {
            scale: 0.7,
            opacity: 0,
            letterSpacing: "0.25em",
          },
          {
            scale: 1,
            opacity: 1,
            letterSpacing: "0.1em",
            duration: 0.8,
            delay: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // WORK (bottom-left) enters from bottom-left
      if (workRef.current) {
        gsap.fromTo(
          workRef.current,
          {
            x: -70,
            y: 50,
            opacity: 0,
            filter: "blur(10px)",
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.1,
            delay: 0.08,
            ease: "power4.out",
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      const getScrollDistance = () => {
        const extraPadding = window.innerWidth < 768 ? 140 : 300;
        return Math.max(600, slider.scrollWidth - container.clientWidth + extraPadding);
      };

      // Set initial state of milestones
      items.forEach((item) => {
        gsap.set(`.jl-${item.id}`, {
          scaleY: reducedMotion ? 1 : 0,
          transformOrigin: item.position === "top" ? "bottom center" : "top center",
        });
        gsap.set(`.jd-${item.id}`, { scale: reducedMotion ? 1 : 0 });
        gsap.set(`.title-${item.id}`, {
          y: reducedMotion ? 0 : item.position === "top" ? 25 : -25,
          opacity: reducedMotion ? 1 : 0,
        });
        gsap.set(`.description-${item.id}`, {
          y: reducedMotion ? 0 : item.position === "top" ? 15 : -15,
          opacity: reducedMotion ? 1 : 0,
        });
      });

      if (journeyLine) {
        gsap.set(journeyLine, { width: reducedMotion ? "100%" : "0%" });
      }

      // Subtle entrance reveal as user scrolls from Selected Works into HOW WE WORK
      if (!reducedMotion) {
        gsap.fromTo(
          slider,
          {
            opacity: 0.15,
            y: 45,
            scale: 0.98,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 95%",
              end: "top top",
              scrub: true,
            },
          }
        );
      }

      // Single pinned GSAP timeline that reliably controls the horizontal track and unpins at the end
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => {
            const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
            return isMobile
              ? `+=${Math.max(650, Math.round(getScrollDistance() * 0.75))}`
              : `+=${Math.max(1600, Math.round(getScrollDistance() * 1.15))}`;
          },
          pin: true,
          anticipatePin: 1,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });

      // 1. Horizontal track slides across
      tl.to(
        slider,
        {
          x: () => -getScrollDistance(),
          ease: "none",
          duration: 10,
        },
        0
      );

      // 2. Glowing center line draws out continuously from the letter K
      if (journeyLine && !reducedMotion) {
        tl.to(
          journeyLine,
          {
            width: "100%",
            ease: "none",
            duration: 10,
          },
          0
        );
      }

      // 3. Sequentially illuminate and reveal each milestone along the horizontal travel
      if (!reducedMotion) {
        // Milestone 01 (Top) shoots out directly from the big line
        tl.to(`.jl-step-01`, { scaleY: 1, duration: 0.6, ease: "power2.out" }, 1.0);
        tl.to(`.jd-step-01`, { scale: 1, duration: 0.4, ease: "back.out(2)" }, 1.3);
        tl.to(`.title-step-01`, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 1.3);
        tl.to(`.description-step-01`, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 1.4);

        // Milestone 02 (Bottom) shoots out directly from the big line
        tl.to(`.jl-step-02`, { scaleY: 1, duration: 0.6, ease: "power2.out" }, 3.2);
        tl.to(`.jd-step-02`, { scale: 1, duration: 0.4, ease: "back.out(2)" }, 3.5);
        tl.to(`.title-step-02`, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 3.5);
        tl.to(`.description-step-02`, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 3.6);

        // Milestone 03 (Top) shoots out directly from the big line
        tl.to(`.jl-step-03`, { scaleY: 1, duration: 0.6, ease: "power2.out" }, 5.5);
        tl.to(`.jd-step-03`, { scale: 1, duration: 0.4, ease: "back.out(2)" }, 5.8);
        tl.to(`.title-step-03`, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 5.8);
        tl.to(`.description-step-03`, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 5.9);

        // Milestone 04 (Bottom) shoots out directly from the big line
        tl.to(`.jl-step-04`, { scaleY: 1, duration: 0.6, ease: "power2.out" }, 7.8);
        tl.to(`.jd-step-04`, { scale: 1, duration: 0.4, ease: "back.out(2)" }, 8.1);
        tl.to(`.title-step-04`, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 8.1);
        tl.to(`.description-step-04`, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, 8.2);

        // 4. Brief reading hold on milestone 04
        tl.to({}, { duration: 0.5 }, 8.4);

        // 5. Swift 3D recede & instant fade out
        tl.to(
          slider,
          {
            scale: 0.88,
            y: -40,
            opacity: 0,
            filter: "blur(14px)",
            transformOrigin: "50% 35%",
            duration: 1.1,
            ease: "power2.inOut",
          },
          8.9
        );
      }
    }, container);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      id="process-pipeline"
      className="relative w-full h-screen h-[100dvh] max-h-screen overflow-hidden flex items-center select-none"
      style={sectionStyle}
    >
      {/* Unified Kinetic Slider - HOW WE WORK is anchored directly to the line at letter 'K' and slides off-screen to the left on scroll */}
      <div
        ref={wholeSliderRef}
        className="flex items-center w-max will-change-transform pl-6 sm:pl-12 lg:pl-20 pr-32 sm:pr-48 lg:pr-60"
      >
        {/* Leading Typography: HOW WE WORK (Line starts directly at the letter 'K') */}
        <div className="relative shrink-0 select-none flex items-center">
          {/* HOW WE positioned directly above WORK */}
          <div className="absolute left-0 bottom-[calc(50%+36px)] sm:bottom-[calc(50%+48px)] lg:bottom-[calc(50%+60px)] xl:bottom-[calc(50%+68px)] flex items-start gap-3 sm:gap-4 whitespace-nowrap pointer-events-none">
            <span
              ref={howWeRef}
              className="font-anton uppercase tracking-[-0.01em] text-[#D1D1D1] text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[8.5rem] leading-[0.88] select-none block will-change-transform"
              style={{ fontFamily: "var(--font-anton), Impact, sans-serif" }}
            >
              HOW WE
            </span>
            <span
              ref={processTagRef}
              className="font-sans font-medium text-xs sm:text-sm tracking-widest text-[#9E9D9A] uppercase pt-2 sm:pt-3 select-none will-change-transform inline-block"
            >
              {periodLabel}
            </span>
          </div>

          {/* WORK in Signature Orange, ending at letter 'K' with direct flush line connection */}
          <div className="flex items-center">
            <span
              ref={workRef}
              className="font-anton uppercase tracking-[-0.01em] text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[8.5rem] leading-[0.88] select-none whitespace-nowrap block will-change-transform"
              style={{
                fontFamily: "var(--font-anton), Impact, sans-serif",
                color: "var(--accent, #FF4D00)",
              }}
            >
              WORK
            </span>
          </div>
        </div>

        {/* Interactive Milestones Horizontal Track - Starts right at letter 'K' */}
        <div className="relative h-[240px] sm:h-[260px] lg:h-[280px] flex items-center">
          {/* Center Orange Active Progress Line */}
          <div className="w-full absolute left-0 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10">
            <div
              ref={journeyLineRef}
              className="h-[2px] w-0 rounded-full journey-line shadow-[0_0_14px_rgba(255,77,0,0.8)]"
              style={activeStyle}
            />
          </div>

          {/* Milestones Sequenced with Stems Touching the Big Line */}
          <div className="flex items-center gap-36 sm:gap-72 lg:gap-96 pl-10 sm:pl-28 lg:pl-36">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="relative w-[245px] sm:w-[320px] lg:w-[360px] h-[240px] sm:h-[260px] lg:h-[280px] shrink-0 pointer-events-none"
                >
                  {item.position === "top" ? (
                    <>
                      {/* Vertical Stem - Bottom edge starts directly ON the big line (bottom: 50%) */}
                      <div
                        className={`absolute left-0 bottom-1/2 -translate-x-1/2 w-[2px] h-[50px] sm:h-[58px] lg:h-[65px] origin-bottom bg-[var(--accent)] shadow-[0_0_8px_rgba(255,77,0,0.6)] z-10 jl-${item.id}`}
                        style={activeStyle}
                      >
                        {/* Solid Orange Circle Dot at the very TOP tip of the stem */}
                        <div
                          className={`absolute -top-2 left-1/2 -translate-x-1/2 size-3 sm:size-3.5 rounded-full bg-[var(--accent)] border-2 border-[#0B0B0C] shadow-[0_0_12px_rgba(255,77,0,0.9)] z-20 jd-${item.id}`}
                          style={activeStyle}
                        />
                      </div>

                      {/* Milestone Text positioned directly next to the top dot */}
                      <div className="absolute left-4 sm:left-5 bottom-[calc(50%+46px)] sm:bottom-[calc(50%+54px)] lg:bottom-[calc(50%+60px)] space-y-1 pointer-events-auto">
                        <h4
                          className={`title-${item.id} font-display font-bold text-base sm:text-lg lg:text-xl text-[var(--fg)] tracking-tight flex items-baseline gap-2 leading-tight`}
                        >
                          <span className="font-mono text-xs sm:text-sm text-[var(--accent)] font-bold">
                            [{item.year}]
                          </span>
                          <span>{item.month}</span>
                        </h4>
                        <p
                          className={`description-${item.id} text-xs sm:text-sm text-[var(--muted)] leading-relaxed font-sans max-w-[245px] sm:max-w-[340px] lg:max-w-[380px]`}
                          style={mutedTextStyle}
                        >
                          {item.content}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Vertical Stem - Top edge starts directly ON the big line (top: 50%) */}
                      <div
                        className={`absolute left-0 top-1/2 -translate-x-1/2 w-[2px] h-[50px] sm:h-[58px] lg:h-[65px] origin-top bg-[var(--accent)] shadow-[0_0_8px_rgba(255,77,0,0.6)] z-10 jl-${item.id}`}
                        style={activeStyle}
                      >
                        {/* Solid Orange Circle Dot at the very BOTTOM tip of the stem */}
                        <div
                          className={`absolute -bottom-2 left-1/2 -translate-x-1/2 size-3 sm:size-3.5 rounded-full bg-[var(--accent)] border-2 border-[#0B0B0C] shadow-[0_0_12px_rgba(255,77,0,0.9)] z-20 jd-${item.id}`}
                          style={activeStyle}
                        />
                      </div>

                      {/* Milestone Text positioned directly next to the bottom dot */}
                      <div className="absolute left-4 sm:left-5 top-[calc(50%+46px)] sm:top-[calc(50%+54px)] lg:top-[calc(50%+60px)] space-y-1 pointer-events-auto">
                        <h4
                          className={`title-${item.id} font-display font-bold text-base sm:text-lg lg:text-xl text-[var(--fg)] tracking-tight flex items-baseline gap-2 leading-tight`}
                        >
                          <span className="font-mono text-xs sm:text-sm text-[var(--accent)] font-bold">
                            [{item.year}]
                          </span>
                          <span>{item.month}</span>
                        </h4>
                        <p
                          className={`description-${item.id} text-xs sm:text-sm text-[var(--muted)] leading-relaxed font-sans max-w-[245px] sm:max-w-[340px] lg:max-w-[380px]`}
                          style={mutedTextStyle}
                        >
                          {item.content}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}
