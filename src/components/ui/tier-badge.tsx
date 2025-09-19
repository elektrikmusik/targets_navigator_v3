import { cn } from '@/lib/utils';
import './tier-badge.css';

interface TierBadgeProps {
  tier: string | null | undefined;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function TierBadge({ tier, className, size = 'md' }: TierBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1.5 text-sm',
    lg: 'px-3 py-2 text-base',
  };

  return (
    <span
      className={cn(
        'tier-badge inline-flex items-center rounded-full font-medium border',
        'bg-[var(--tier-bg)] text-[var(--tier-fg)] border-[var(--tier-border)]',
        sizeClasses[size],
        className
      )}
      data-tier={tier}
    >
      {tier || 'N/A'}
    </span>
  );
}
