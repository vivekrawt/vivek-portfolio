import { cva, type VariantProps } from 'class-variance-authority'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

const button = cva(
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 ease-editorial disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // PRD §5.2 — solid ink, surface text, small radius.
        primary: 'bg-ink text-surface hover:bg-ink/85 active:bg-ink',
        outline: 'border border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-ink/[0.03]',
        text: 'link-underline px-0 text-ink-muted hover:text-ink',
      },
      size: {
        md: 'h-11 px-6 text-[0.95rem]',
        lg: 'h-[52px] px-8 text-base',
        none: '',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

type Variants = VariantProps<typeof button>

export const buttonClass = (v: Variants & { className?: string }) =>
  cn(button({ variant: v.variant, size: v.size }), v.className)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & Variants

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button className={buttonClass({ variant, size, className })} {...props} />
}

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  Variants & { to?: string; href?: string }

/** Renders a router <Link> for `to`, a plain <a> for `href`. */
export function LinkButton({ className, variant, size, to, href, ...props }: LinkButtonProps) {
  const classes = buttonClass({ variant, size, className })
  if (to) return <Link to={to} className={classes} {...props} />
  return <a href={href} className={classes} {...props} />
}
