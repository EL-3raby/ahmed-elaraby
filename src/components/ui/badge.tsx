import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-mono font-medium transition-all duration-200 select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "border-white/20 bg-white text-black hover:bg-[#FF4D00] hover:text-white",
        secondary:
          "border-white/10 bg-white/[0.035] text-white/85 hover:border-[#FF4D00]/60 hover:bg-[#FF4D00]/10 hover:text-white backdrop-blur-xs",
        destructive:
          "border-transparent bg-red-900/40 text-red-300 hover:bg-red-900/60",
        outline: "border-white/20 text-white hover:bg-white/[0.08]",
        accent: "border-[#FF4D00]/50 bg-[#FF4D00]/15 text-white hover:bg-[#FF4D00]",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
