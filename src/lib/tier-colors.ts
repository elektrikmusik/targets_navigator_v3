// Simple tier color definitions
export const TIER_COLORS = {
  'Tier 1': '#e87722',
  'Tier 2': '#ffb500',
  'Tier 3': '#59315f',
  'Tier 4': '#6e3fa3',
  'Partner': '#00b398',
  'Unknown': '#666666',
} as const;

export type TierType = keyof typeof TIER_COLORS;

// Helper function to get tier color
export function getTierColor(tier: string | null | undefined): string {
  if (!tier || !(tier in TIER_COLORS)) {
    return TIER_COLORS['Unknown'];
  }
  return TIER_COLORS[tier as TierType];
}
