"use client";

// A portfolio index built as a wheel you turn.
//
// At rest the work sits in a ring around a title, each card tangent to the
// circle. The first notch of scroll blows the ring open into a vertical drum:
// the card at the front lies flat and full size, the ones above and below
// rotate away into hard perspective and run off the top and bottom of the
// frame. Keep turning and the drum carries the next piece round to the front.
//
// The whole thing is one number - `turn` - read by a single rAF pass that writes
// transforms straight to the DOM. 0 is the ring, 1 is the drum with item 0 at
// the front, and every whole number after that is one more item turned past.
import * as React from "react";
import { cn } from "@/lib/utils";

export interface WorksWheelItem {
  /** Project name. Shown beside the front card and in the index. */
  title: string;
  /** Cover art. Any src an <img> takes. */
  image: string;
  /** Where the card links to. Omit for a wheel that only browses. */
  href?: string;
  /** Custom extra metadata for portfolio projects */
  id?: string;
  category?: string;
  categoryLabel?: string;
  tagline?: string;
  impactMetric?: string;
  stack?: string[];
  year?: string;
  role?: string;
}

export interface WorksWheelProps extends Omit<
  React.ComponentPropsWithoutRef<"section">,
  "children"
> {
  items: WorksWheelItem[];
  /** Sits in the middle of the ring. @default undefined */
  label?: string;
  /** Label on the card's hover affordance. Omit to drop it. @default undefined */
  action?: string;
  /** Callback when front card or action is clicked */
  onItemClick?: (item: WorksWheelItem, index: number) => void;
  /** Driven externally by GSAP ScrollTrigger (from 0 to count) */
  turnProgress?: number;
  /** Called when an index item is clicked (0..count-1 for card, -1 for ring) */
  onIndexClick?: (targetIndex: number) => void;
  /** Active card index notification */
  onActiveChange?: (active: number) => void;
}

/* Geometry. The card is measured against the stage; everything else is measured
   against the card, so a narrow stage - where the card is capped by width, not
   height - scales the whole wheel down with it instead of leaving a small card
   swinging on a huge drum. The three that matter are tuned together: STEP
   against DRUM sets how hard the neighbours rotate away, and DRUM against LENS
   decides whether they land inside the frame or run off it. */
const CARD_H = 0.68; // large prominent monitor height matching Image 2
const CARD_MAX_W = 0.58; // comfortable stage width on the right
const CARD_RATIO = 1.58; // widescreen cinematic 16:10 monitor aspect ratio
const STEP = 42; // degrees between cards on the drum
const DRUM = 2.4; // drum radius
const LENS = 2.8; // perspective distance
const RING_R = 1.05; // ring radius in ring overview
const BOW = 1.6;
const TITLE = 0.085; // ring label size
const INDEX = 0.035; // index size
const CULL = 1.0;

/** How much of a wheel-notch or a dragged pixel counts as one item. */
const WHEEL_UNITS = 850;
const DRAG_UNITS = 380;
/** Quiet time after the last wheel event before the wheel settles on an item. */
const SETTLE = 150;
/** Fraction of the remaining distance closed each frame. 1 = no smoothing. */
const EASE = 0.12;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Stage = { w: number; h: number };

const rad = (deg: number) => (deg * Math.PI) / 180;

/** How far left the arc has carried something that has turned `drumDeg` off the
    front. Zero at the front, so the piece being read stays centred. */
const bowAt = (drumDeg: number, bow: number) =>
  -bow * (1 - Math.cos(rad(drumDeg)));

/** Both states in one chain: the ring terms fall away as `m` reaches the drum,
    and the drum terms are still zero while the ring is up. The bow is applied
    first, in the wheel's own plane, so it slides the card sideways rather than
    turning with it - and perspective still shrinks it with distance. */
function place(
  ringDeg: number,
  drumDeg: number,
  ringR: number,
  drumR: number,
  bow: number,
  m: number,
) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  );
}

export interface WorksWheelHandle {
  setTurn: (turnValue: number) => void;
  getTurn: () => number;
}

export const WorksWheel = React.forwardRef<WorksWheelHandle, WorksWheelProps>(
  function WorksWheel(
    {
      items,
      label = "Latest work",
      action = "Inspect Architecture",
      onItemClick,
      turnProgress,
      onIndexClick,
      onActiveChange,
      className,
      ...props
    },
    ref
  ) {
    const stageRef = React.useRef<HTMLDivElement>(null);
    const wheelRef = React.useRef<HTMLDivElement>(null);
    const cardRefs = React.useRef<(HTMLElement | null)[]>([]);

    // The wheel's position, and where it is heading. Only `active` is state -
    // everything else is written to the DOM, so turning the wheel is not a render.
    // Starts directly at turn = 1 (Card 01 front and prominent)
    const turn = React.useRef(1);
    const target = React.useRef(1);
    const [active, setActive] = React.useState(0);
    const activeRef = React.useRef(0);
    const [stage, setStage] = React.useState<Stage>({ w: 0, h: 0 });

    const count = items.length;
    const last = Math.max(count - 1, 0);

    React.useImperativeHandle(
      ref,
      () => ({
        setTurn: (val: number) => {
          target.current = clamp(val, 0, last + 1);
        },
        getTurn: () => turn.current,
      }),
      [last]
    );

  // Read after mount, not during render: the server has no matchMedia, and
  // branching on it inline is a hydration mismatch. Reduced motion drops the
  // easing, so the wheel lands where it is put instead of gliding there.
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const metrics = React.useMemo(() => {
    const { w, h } = stage;
    const cardW = Math.min(h * CARD_H * CARD_RATIO, w * CARD_MAX_W);
    const cardH = cardW / CARD_RATIO;
    const drumR = cardH * DRUM;
    const ringR = cardH * RING_R;
    // Shrink the ring's cards until the circle reads as a closed loop rather
    // than beads on a wire, however many pieces the wheel is given.
    const ringScale = count
      ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.16, 1)
      : 1;
    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * BOW,
      depth: cardH * LENS,
      title: cardH * TITLE,
      index: cardH * INDEX,
    };
  }, [stage, count]);

  // One pass per frame: ease toward the target, then write every transform.
  React.useEffect(() => {
    if (!stage.h) return;
    let frame = 0;
    const { ringR, ringScale, drumR, bow } = metrics;

    const draw = () => {
      frame = requestAnimationFrame(draw);
      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) turn.current = target.current;
      else turn.current += gap * (reduced ? 1 : EASE);

      const t = turn.current;
      const m = clamp(t, 0, 1);
      const pos = Math.max(0, t - 1);

      // The drum is pulled back so its front face lands on the picture plane.
      // That set-back has to arrive with the drum, or the ring would sit at the
      // far side of the perspective and render at half its size.
      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`;
      }

      for (let i = 0; i < count; i++) {
        const d = i - pos;
        const drumDeg = d * STEP;
        const card = cardRefs.current[i];
        if (card) {
          card.style.transform = place(
            d * (360 / count),
            drumDeg,
            ringR,
            drumR,
            bow,
            m,
          );
          // In drum mode, display ONLY the active front card on its own!
          // Fades out neighbour cards completely so only the single active card stands alone.
          const distFromFront = Math.abs(d);
          const opacity = Math.max(0, 1 - distFromFront * 2.2);

          card.style.opacity = String(opacity);
          card.style.pointerEvents = distFromFront < 0.35 ? "auto" : "none";
          card.style.zIndex = String(Math.round(100 - distFromFront * 10));
        }
        const face = card?.firstElementChild as HTMLElement | null;
        if (face) face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
      }

      const near = clamp(Math.round(pos), 0, last);
      if (activeRef.current !== near) {
        activeRef.current = near;
        setActive(near);
        if (onActiveChange) {
          queueMicrotask(() => {
            onActiveChange(near);
          });
        }
      }
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.h, count, last, reduced, onActiveChange]);

  const to = React.useCallback(
    (next: number) => {
      target.current = clamp(next, 0, last + 1);
    },
    [last],
  );

  // Sync with external ScrollTrigger progress when provided
  React.useEffect(() => {
    if (typeof turnProgress === "number") {
      target.current = clamp(turnProgress, 0, last + 1);
    }
  }, [turnProgress, last]);

  const settling = React.useRef(0);

  // Native wheel listener for standalone drum rotation (skipped when driven by ScrollTrigger pin)
  React.useEffect(() => {
    if (typeof turnProgress === "number") return;

    const el = stageRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      const next = target.current + event.deltaY / WHEEL_UNITS;
      // Prevent browser scroll only when wheel is actively cycling through cards
      if (next > 0.05 && next < last + 0.95) {
        event.preventDefault();
      }
      to(next);
      window.clearTimeout(settling.current);
      settling.current = window.setTimeout(
        () => to(Math.round(target.current)),
        SETTLE,
      );
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.clearTimeout(settling.current);
    };
  }, [to, last, turnProgress]);

  const drag = React.useRef<number | null>(null);

  const activeItem = items[active];

  return (
    <section
      aria-label={label}
      className={cn(
        "relative h-full w-full overflow-hidden select-none bg-transparent text-[var(--fg)]",
        className,
      )}
      {...props}
    >
      <div
        ref={stageRef}
        tabIndex={0}
        role="listbox"
        aria-label={label}
        aria-activedescendant={`works-wheel-${active}`}
        className="focus-visible:outline-[var(--accent)] absolute inset-0 cursor-grab touch-pan-x outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 active:cursor-grabbing"
        style={{ perspective: `${metrics.depth}px` }}
        onPointerDown={(event) => {
          drag.current = event.clientY;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (drag.current === null) return;
          to(target.current + (drag.current - event.clientY) / DRAG_UNITS);
          drag.current = event.clientY;
        }}
        onPointerUp={() => {
          // Land on an item rather than between two.
          drag.current = null;
          if (target.current > 1) to(Math.round(target.current));
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") to(Math.round(target.current) + 1);
          else if (event.key === "ArrowUp") to(Math.round(target.current) - 1);
          else return;
          event.preventDefault();
        }}
      >
        <div
          ref={wheelRef}
          className="absolute top-1/2 left-1/2 lg:left-[67%] xl:left-[69%] [transform-style:preserve-3d]"
        >
          {items.map((item, i) => {
            const isCurrent = i === active;
            return (
              <div
                key={item.id || item.title}
                id={`works-wheel-${i}`}
                role="option"
                aria-selected={isCurrent}
                onClick={() => {
                  if (item.href && item.href !== '#') {
                    window.open(item.href, "_blank");
                  } else if (onItemClick) {
                    onItemClick(item, i);
                  }
                }}
                ref={(node: HTMLElement | null) => {
                  cardRefs.current[i] = node;
                }}
                className={cn(
                  "group absolute [backface-visibility:hidden] cursor-pointer transition-shadow",
                  isCurrent ? "pointer-events-auto" : "pointer-events-none",
                )}
                style={{
                  width: metrics.cardW,
                  height: metrics.cardH,
                  marginLeft: -metrics.cardW / 2,
                  marginTop: -metrics.cardH / 2,
                }}
              >
                {/* Desktop Monitor Bezel Frame (matching Image 2) */}
                <div className="relative block size-full p-2 sm:p-2.5 rounded-2xl sm:rounded-3xl border border-white/20 bg-[#0e0e11] shadow-[0_35px_100px_-20px_rgba(0,0,0,0.9)] group-hover:border-white/35 transition-all duration-300">
                  {/* Inner Screen Display */}
                  <div className="relative size-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#09090b]">
                    <img
                      src={item.image}
                      alt={item.title}
                      draggable={false}
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Subtle Screen Glare / Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/35 via-transparent to-white/5 pointer-events-none" />

                    {/* Centered Hover Pill Button: VIEW PROJECT ↗ */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/45 backdrop-blur-[2px] pointer-events-none">
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.href && item.href !== '#') {
                            window.open(item.href, "_blank");
                          } else if (onItemClick) {
                            onItemClick(item, i);
                          }
                        }}
                        className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-black/90 border border-white/30 text-white font-mono text-xs sm:text-sm font-semibold tracking-wider flex items-center gap-2 shadow-2xl hover:bg-white hover:text-black hover:border-white transition-all transform scale-90 group-hover:scale-100 pointer-events-auto cursor-pointer"
                      >
                        <span>VIEW PROJECT</span>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Monitor Stand Neck & Base */}
                  <div className="absolute -bottom-7 sm:-bottom-8 left-1/2 -translate-x-1/2 w-16 sm:w-24 h-7 sm:h-8 bg-gradient-to-b from-[#2a2a2e] to-[#121214] border-x border-white/10 rounded-b shadow-xl pointer-events-none -z-10" />
                  <div className="absolute -bottom-9 sm:-bottom-10 left-1/2 -translate-x-1/2 w-32 sm:w-44 h-2 bg-gradient-to-r from-[#18181b] via-[#35353d] to-[#18181b] border-t border-white/15 rounded-full shadow-2xl pointer-events-none -z-10" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default WorksWheel;
