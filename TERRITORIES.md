# Business Territory System

This document describes the business territory system implemented for the choropleth map visualization.

## Overview

The territory system allows you to visualize business data across four major territories:

- **APAC** (Asia Pacific) - Blue (#3B82F6)
- **AMER** (Americas) - Green (#10B981)
- **MENA** (Middle East & North Africa) - Orange (#F59E0B)
- **EUROPE** (Europe) - Purple (#8B5CF6)

## Features

### 1. Territory Definitions (`/src/lib/territories.ts`)

- Complete country-to-territory mapping
- Territory color schemes and metadata
- Utility functions for territory operations
- Type-safe territory IDs

### 2. Territory Hook (`/src/hooks/useTerritories.ts`)

- Manages territory data processing
- Handles country-to-territory conversion
- Provides territory statistics
- Supports filtering and visualization modes

### 3. Enhanced ChoroplethMap Component

- **Country View**: Countries colored by their territory assignment
- **Territory View**: Data aggregated by territory
- **Territory Filtering**: Focus on specific territories
- **Territory Legends**: Automatic legend generation

### 4. Interactive Controls

- View mode toggle (Country/Territory)
- Territory filter dropdown
- Territory border visibility
- Real-time map updates

## Usage

### Basic Implementation

```tsx
import { ChoroplethMap } from './components/charts/ChoroplethMap'

;<ChoroplethMap
  territoryMode="country" // or "territory"
  selectedTerritory="APAC" // or null for all
  showTerritoryBorders={true}
  width={800}
  height={500}
/>
```

### Using the Territory Hook

```tsx
import { useTerritories } from './hooks/useTerritories'

const {
  territoryData,
  countryData,
  territoryStats,
  colors,
  domain,
  legendData,
} = useTerritories({
  data: yourData,
  mode: 'territory',
  selectedTerritory: 'APAC',
})
```

### Territory Data Structure

```typescript
interface Territory {
  id: string // 'APAC', 'AMER', 'MENA', 'EUROPE'
  name: string // 'Asia Pacific', 'Americas', etc.
  color: string // Hex color code
  description: string // Territory description
  countries: string[] // Array of country codes
}
```

## Territory Mappings

### APAC (Asia Pacific)

- **East Asia**: China, Japan, South Korea, Taiwan, Hong Kong, Macau, Mongolia, North Korea
- **Southeast Asia**: Indonesia, Malaysia, Singapore, Thailand, Vietnam, Philippines, Myanmar, Cambodia, Laos, Timor-Leste, Brunei
- **South Asia**: India, Pakistan, Bangladesh, Sri Lanka, Nepal, Bhutan, Maldives, Afghanistan
- **Oceania**: Australia, New Zealand, Papua New Guinea, Fiji, Solomon Islands, Vanuatu, Samoa, Tonga, Kiribati, Nauru, Tuvalu, Federated States of Micronesia, Marshall Islands, Palau, Cook Islands, Niue

### AMER (Americas)

- **North America**: United States, Canada, Mexico
- **Central America**: Guatemala, Belize, El Salvador, Honduras, Nicaragua, Costa Rica, Panama
- **Caribbean**: Cuba, Jamaica, Haiti, Dominican Republic, Puerto Rico, Trinidad and Tobago, Bahamas, Barbados, Saint Lucia, Saint Vincent and the Grenadines, Grenada, Antigua and Barbuda, Dominica, Saint Kitts and Nevis, Anguilla, British Virgin Islands, Turks and Caicos Islands, Sint Maarten, Curaçao, Aruba, Bonaire, Sint Eustatius and Saba
- **South America**: Brazil, Argentina, Chile, Colombia, Peru, Venezuela, Ecuador, Bolivia, Paraguay, Uruguay, Guyana, Suriname, French Guiana

### MENA (Middle East & North Africa)

- **Middle East**: Saudi Arabia, UAE, Qatar, Kuwait, Bahrain, Oman, Yemen, Iran, Iraq, Syria, Lebanon, Jordan, Israel, Palestine, Turkey, Cyprus
- **North Africa**: Egypt, Libya, Tunisia, Algeria, Morocco, Sudan, South Sudan, Somalia, Djibouti, Comoros, Mayotte, Réunion
- **Central Asia**: Kazakhstan, Uzbekistan, Turkmenistan, Kyrgyzstan, Tajikistan, Afghanistan

### EUROPE (Europe)

- **Western Europe**: Germany, France, United Kingdom, Italy, Spain, Netherlands, Belgium, Austria, Switzerland, Luxembourg, Ireland, Portugal, Iceland, Norway, Sweden, Denmark, Finland
- **Eastern Europe**: Poland, Czech Republic, Slovakia, Hungary, Romania, Bulgaria, Croatia, Slovenia, Estonia, Latvia, Lithuania, Russia, Ukraine, Belarus, Moldova
- **Balkans**: Serbia, Montenegro, Bosnia and Herzegovina, North Macedonia, Albania, Greece, Turkey
- **Other European**: Malta, Cyprus, Liechtenstein, Andorra, Monaco, San Marino, Vatican City

## API Reference

### Territory Functions

```typescript
// Get territory for a country
getTerritoryForCountry(countryCode: string): Territory | null

// Get countries in a territory
getCountriesInTerritory(territoryId: string): string[]

// Get territory statistics
getTerritoryStats(data: Array<{id: string; value: number}>): Record<string, TerritoryStats>

// Convert country data to territory data
convertToTerritoryData(data: Array<{id: string; value: number}>): TerritoryData[]
```

### Territory Hook Options

```typescript
interface UseTerritoriesOptions {
  data?: Array<{ id: string; value: number }>
  mode?: 'country' | 'territory'
  selectedTerritory?: TerritoryId | null
  showTerritoryBorders?: boolean
}
```

## Routes

- `/map` - Main map with territory controls
- `/territories` - Territory demonstration page

## Styling

Territories use distinct color schemes that are accessible and visually distinct:

- High contrast ratios for accessibility
- Consistent color application across all components
- Automatic legend generation with territory colors

## Performance

- Memoized territory calculations
- Efficient country-to-territory mapping
- Optimized re-renders with React.useMemo
- Canvas rendering for high performance

## Future Enhancements

- Custom territory definitions
- Territory-specific data sources
- Advanced filtering options
- Territory comparison views
- Export functionality for territory data
