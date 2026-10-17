import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-xs font-mono font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--border)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer uppercase tracking-wider',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--fg)] text-[var(--bg)] shadow-sm hover:bg-[var(--accent)] hover:text-white transition-all duration-300',
        destructive:
          'bg-red-600 text-white shadow-sm hover:bg-red-700',
        outline:
          'border border-[var(--border)] bg-transparent text-[var(--fg)] hover:bg-[var(--card)] hover:border-[var(--fg)]',
        secondary:
          'bg-[var(--card)] text-[var(--fg)] border border-[var(--border)] hover:bg-[var(--border)]/20',
        ghost: 'hover:bg-[var(--card)] text-[var(--fg)]',
        link: 'text-[var(--accent)] underline-offset-4 hover:underline',
        accent: 'bg-[var(--accent)] text-white shadow-sm hover:opacity-90',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-full px-3 text-[11px]',
        lg: 'h-11 rounded-full px-6 text-xs',
        icon: 'h-9 w-9 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
