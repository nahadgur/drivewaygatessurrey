// components/ui/Button.tsx
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ReactNode, ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
  showArrow?: boolean;
  fullWidth?: boolean;
}

interface ButtonAsButton extends CommonProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  href?: undefined;
}

interface ButtonAsLink extends CommonProps {
  href: string;
  onClick?: () => void;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClass: Record<Variant, string> = {
  primary:   'btn-primary',
  secondary: 'btn-secondary',
  ghost:     'btn-ghost',
};

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    children,
    showArrow = false,
    fullWidth = false,
    ...rest
  } = props as ButtonProps & { className?: string };

  const className = [
    variantClass[variant],
    fullWidth && variant !== 'ghost' ? 'w-full justify-between' : '',
  ].filter(Boolean).join(' ');

  const inner = (
    <>
      <span>{children}</span>
      {showArrow && <ArrowUpRight className="w-5 h-5" strokeWidth={1.5} />}
    </>
  );

  if ('href' in props && props.href !== undefined) {
    return (
      <Link href={props.href} className={className} onClick={props.onClick}>
        {inner}
      </Link>
    );
  }

  const { href: _h, ...buttonRest } = rest as ButtonAsButton;
  return (
    <button className={className} {...buttonRest}>
      {inner}
    </button>
  );
}
