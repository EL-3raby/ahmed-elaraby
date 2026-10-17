"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export interface ExpandableSkillTagsProps {
  /** The main title for the skills section. */
  title: string;
  /** An array of strings representing the skills to be displayed. */
  skills: string[];
  /** The number of skills to show before expanding. Defaults to 5. */
  initialCount?: number;
  /** Optional additional class names for custom styling. */
  className?: string;
  /** Optional category identifier or index tag, e.g. [01 // WEB & CLOUD] */
  tag?: string;
}

/**
 * Editorial Architectural ExpandableSkillTags component.
 * Features unified card heights, sleek terminal tags, and spring staggered animations.
 */
export const ExpandableSkillTags = ({
  title,
  skills,
  initialCount = 6,
  className,
  tag,
}: ExpandableSkillTagsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Memoize visible and hidden skills
  const visibleSkills = React.useMemo(() => skills.slice(0, initialCount), [skills, initialCount]);
  const hiddenSkills = React.useMemo(() => skills.slice(initialCount), [skills, initialCount]);

  const toggleExpansion = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12, scale: 0.88 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 22,
      },
    },
  };

  return (
    <motion.section
      layout
      transition={{ layout: { duration: 0.25, ease: "easeOut" } }}
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "h-full w-full rounded-2xl bg-[#121215]/95 border border-white/[0.08] hover:border-white/20 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between shadow-xl backdrop-blur-md relative overflow-hidden group select-none",
        className
      )}
    >
      {/* Subtle top accent corner glow on hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF4D00]/5 rounded-full blur-2xl pointer-events-none group-hover:bg-[#FF4D00]/10 transition-colors duration-500" />

      {/* Top Header */}
      <div className="relative z-10 shrink-0">
        <div className="flex items-center justify-between gap-3 mb-1.5">
          {tag && (
            <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-[var(--accent)] tracking-wider">
              <span className="w-1.5 h-1.5 rounded-sm bg-[var(--accent)] shrink-0" />
              <span>{tag}</span>
            </div>
          )}
          <span className="font-mono text-[10px] text-white/50 bg-white/[0.04] px-2 py-0.5 rounded border border-white/10 uppercase tracking-widest shrink-0">
            {skills.length} Tools
          </span>
        </div>

        <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
          {title}
        </h3>

        {/* Hairline Divider */}
        <div className="h-[1px] w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent my-3 sm:my-3.5" />
      </div>

      {/* Skills Badges Grid - Constrained to prevent layout expansion and clipping */}
      <div className="relative z-10 flex-1 my-1 max-h-[160px] sm:max-h-[175px] overflow-y-auto pr-1">
        <motion.div
          layout
          className="flex flex-wrap gap-2 py-0.5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {/* Always visible skills */}
          {visibleSkills.map((skill, index) => {
            const isFlagship = index === 0;

            return (
              <motion.div
                key={`visible-${skill}-${index}`}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 450, damping: 18 }}
              >
                <Badge
                  variant={isFlagship ? "accent" : "secondary"}
                  className="transition-all duration-200"
                >
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full shrink-0",
                      isFlagship ? "bg-[#FF4D00] animate-pulse" : "bg-white/40"
                    )}
                  />
                  <span>{skill}</span>
                </Badge>
              </motion.div>
            );
          })}

          {/* Conditionally rendered extra skills */}
          <AnimatePresence mode="popLayout">
            {isExpanded &&
              hiddenSkills.map((skill, index) => (
                <motion.div
                  key={`hidden-${skill}-${index}`}
                  initial={{ opacity: 0, scale: 0.7, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.7, y: 12 }}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 24,
                    delay: index * 0.03,
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Badge
                    variant="secondary"
                    className="border-white/15 bg-white/[0.06] text-white hover:border-[#FF4D00]/60"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                    <span>{skill}</span>
                  </Badge>
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Bottom Bar: Action Toggle and Status */}
      <div className="relative z-10 mt-3 pt-3 border-t border-white/[0.08] flex items-center justify-between shrink-0">
        {skills.length > initialCount ? (
          <Button
            variant="link"
            size="sm"
            className="px-0 h-auto text-xs font-mono font-medium text-[var(--accent)] hover:text-white transition-colors cursor-pointer group/btn flex items-center gap-1.5 uppercase tracking-wider"
            onClick={toggleExpansion}
            aria-expanded={isExpanded}
          >
            <span>
              {isExpanded ? "[ − SHOW LESS ]" : `[ + SHOW ${hiddenSkills.length} MORE ]`}
            </span>
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="inline-block"
            >
              <ChevronDown className="w-3.5 h-3.5 text-[var(--accent)] group-hover/btn:text-white" />
            </motion.span>
          </Button>
        ) : (
          <span className="font-mono text-[11px] text-white/40 uppercase tracking-wider">
            [ ALL TOOLS ACTIVE ]
          </span>
        )}

        <span className="font-mono text-[11px] text-white/50 tracking-wider">
          {isExpanded ? `${skills.length} / ${skills.length} ACTIVE` : `${initialCount} / ${skills.length} ACTIVE`}
        </span>
      </div>
    </motion.section>
  );
};

export default ExpandableSkillTags;
