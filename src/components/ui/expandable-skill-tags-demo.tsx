"use client";

import React from "react";
import { ExpandableSkillTags } from "@/components/ui/expandable-skill-tags";

// Sample data for the demo
const allSkills = [
  "Data Security", "Workforce Development", "Organizational Strategy",
  "Prompt Engineering", "Productivity Software", "Critical Thinking",
  "Generative AI", "LLM Application", "Large Language Modeling",
  "Prompt Patterns", "Process Optimization", "Human Computer Interaction",
  "Innovation", "AI Product Strategy", "Emerging Technologies",
  "Analysis", "Sociology",
];

const coreSkills = [
  "React", "TypeScript", "Next.js", "Tailwind CSS",
  "Node.js", "Prisma", "UI/UX Design",
];

/**
 * A demo component to showcase the ExpandableSkillTags component.
 */
export default function SkillTagsDemo() {
  return (
    <div className="w-full max-w-4xl space-y-8 rounded-2xl bg-black/60 border border-white/10 p-8 text-white">
      {/* First example with a large number of skills */}
      <ExpandableSkillTags
        tag="[DEMO // 01]"
        title="Skills you'll gain"
        skills={allSkills}
        initialCount={10} // It will show 10 skills initially
      />
      
      {/* Second example with fewer skills where the button won't appear */}
      <ExpandableSkillTags
        tag="[DEMO // 02]"
        title="Core Development Skills"
        skills={coreSkills}
        initialCount={10} // More than the total skills, so no toggle is needed
      />
    </div>
  );
}
