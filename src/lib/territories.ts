export interface Territory {
  id: string
  name: string
  color: string
  description: string
  countries: string[]
}

export const BUSINESS_TERRITORIES: Territory[] = [
  {
    id: 'APAC',
    name: 'Asia Pacific',
    color: '#3B82F6', // Blue
    description:
      'Asia Pacific region including East Asia, Southeast Asia, and Oceania',
    countries: [
      // East Asia
      'CHN',
      'JPN',
      'KOR',
      'TWN',
      'HKG',
      'MAC',
      'MNG',
      'PRK',
      // Southeast Asia
      'IDN',
      'MYS',
      'SGP',
      'THA',
      'VNM',
      'PHL',
      'MMR',
      'KHM',
      'LAO',
      'TLS',
      'BRN',
      // South Asia
      'IND',
      'PAK',
      'BGD',
      'LKA',
      'NPL',
      'BTN',
      'MDV',
      'AFG',
      // Oceania
      'AUS',
      'NZL',
      'PNG',
      'FJI',
      'SLB',
      'VUT',
      'WSM',
      'TON',
      'KIR',
      'NRU',
      'TUV',
      'FSM',
      'MHL',
      'PLW',
      'COK',
      'NIU',
    ],
  },
  {
    id: 'AMER',
    name: 'Americas',
    color: '#10B981', // Green
    description: 'North, Central, and South America',
    countries: [
      // North America
      'USA',
      'CAN',
      'MEX',
      // Central America
      'GTM',
      'BLZ',
      'SLV',
      'HND',
      'NIC',
      'CRI',
      'PAN',
      // Caribbean
      'CUB',
      'JAM',
      'HTI',
      'DOM',
      'PRI',
      'TTO',
      'BHS',
      'BRB',
      'LCA',
      'VCT',
      'GRD',
      'ATG',
      'DMA',
      'KNA',
      'AIA',
      'VGB',
      'TCA',
      'SXM',
      'CUR',
      'ABW',
      'BES',
      // South America
      'BRA',
      'ARG',
      'CHL',
      'COL',
      'PER',
      'VEN',
      'ECU',
      'BOL',
      'PRY',
      'URY',
      'GUY',
      'SUR',
      'GUF',
    ],
  },
  {
    id: 'MENA',
    name: 'Middle East & North Africa',
    color: '#F59E0B', // Orange
    description: 'Middle East and parts of Central Asia',
    countries: [
      // Middle East
      'SAU',
      'ARE',
      'QAT',
      'KWT',
      'BHR',
      'OMN',
      'YEM',
      'IRN',
      'IRQ',
      'SYR',
      'LBN',
      'JOR',
      'ISR',
      'PSE',
      'TUR',
      'CYP',
      // Central Asia (MENA-aligned)
      'KAZ',
      'UZB',
      'TKM',
      'KGZ',
      'TJK',
      'AFG',
    ],
  },
  {
    id: 'AFRICA',
    name: 'Africa',
    color: '#EF4444', // Red
    description: 'Sub-Saharan Africa and North Africa',
    countries: [
      // North Africa
      'EGY',
      'LBY',
      'TUN',
      'DZA',
      'MAR',
      'SDN',
      'SSD',
      'SOM',
      'DJI',
      'COM',
      'MTQ',
      'REU',
      'MYT',
      // West Africa
      'NGA',
      'GHA',
      'SEN',
      'MLI',
      'BFA',
      'NER',
      'TCD',
      'GIN',
      'SLE',
      'LBR',
      'CIV',
      'GMB',
      'GNB',
      'GNQ',
      'STP',
      'CPV',
      'MRT',
      'TGO',
      // East Africa
      'ETH',
      'KEN',
      'TZA',
      'UGA',
      'RWA',
      'BDI',
      'ERI',
      'MDG',
      'MUS',
      'SYC',
      // Central Africa
      'COD',
      'CAF',
      'CMR',
      'COG',
      'GAB',
      'AGO',
      'ZMB',
      'MWI',
      'ZWE',
      'BWA',
      'NAM',
      'ZAF',
      'LSO',
      'SWZ',
      'MOZ',
    ],
  },
  {
    id: 'EUROPE',
    name: 'Europe',
    color: '#8B5CF6', // Purple
    description: 'European Union, United Kingdom, and other European countries',
    countries: [
      // Western Europe
      'DEU',
      'FRA',
      'GBR',
      'ITA',
      'ESP',
      'NLD',
      'BEL',
      'AUT',
      'CHE',
      'LUX',
      'IRL',
      'PRT',
      'ISL',
      'NOR',
      'SWE',
      'DNK',
      'FIN',
      // Eastern Europe
      'POL',
      'CZE',
      'SVK',
      'HUN',
      'ROU',
      'BGR',
      'HRV',
      'SVN',
      'EST',
      'LVA',
      'LTU',
      'RUS',
      'UKR',
      'BLR',
      'MDA',
      // Balkans
      'SRB',
      'MNE',
      'BIH',
      'MKD',
      'ALB',
      'GRC',
      'TUR',
      // Other European
      'MLT',
      'CYP',
      'LIE',
      'AND',
      'MCO',
      'SMR',
      'VAT',
    ],
  },
]

export const TERRITORY_COLORS = {
  APAC: '#3B82F6',
  AMER: '#10B981',
  MENA: '#F59E0B',
  AFRICA: '#EF4444',
  EUROPE: '#8B5CF6',
} as const

export const TERRITORY_NAMES = {
  APAC: 'Asia Pacific',
  AMER: 'Americas',
  MENA: 'Middle East & North Africa',
  AFRICA: 'Africa',
  EUROPE: 'Europe',
} as const

export type TerritoryId = keyof typeof TERRITORY_COLORS

/**
 * Get territory for a given country code
 */
export function getTerritoryForCountry(countryCode: string): Territory | null {
  return (
    BUSINESS_TERRITORIES.find(territory =>
      territory.countries.includes(countryCode)
    ) || null
  )
}

/**
 * Get all countries in a territory
 */
export function getCountriesInTerritory(territoryId: string): string[] {
  const territory = BUSINESS_TERRITORIES.find(t => t.id === territoryId)
  return territory ? territory.countries : []
}

/**
 * Get territory statistics
 */
export function getTerritoryStats(data: Array<{ id: string; value: number }>) {
  const stats: Record<
    string,
    { count: number; total: number; average: number; countries: string[] }
  > = {}

  BUSINESS_TERRITORIES.forEach(territory => {
    const territoryData = data.filter(item =>
      territory.countries.includes(item.id)
    )
    const total = territoryData.reduce((sum, item) => sum + item.value, 0)
    const count = territoryData.length

    stats[territory.id] = {
      count,
      total,
      average: count > 0 ? total / count : 0,
      countries: territoryData.map(item => item.id),
    }
  })

  return stats
}

/**
 * Convert country data to territory data
 */
export function convertToTerritoryData(
  data: Array<{ id: string; value: number }>
) {
  const territoryTotals: Record<string, number> = {}
  const territoryCounts: Record<string, number> = {}

  // Initialize territory totals
  BUSINESS_TERRITORIES.forEach(territory => {
    territoryTotals[territory.id] = 0
    territoryCounts[territory.id] = 0
  })

  // Sum up values by territory
  data.forEach(item => {
    const territory = getTerritoryForCountry(item.id)
    if (territory) {
      territoryTotals[territory.id] += item.value
      territoryCounts[territory.id] += 1
    }
  })

  // Convert to territory data format
  return BUSINESS_TERRITORIES.map(territory => ({
    id: territory.id,
    value: territoryTotals[territory.id],
    count: territoryCounts[territory.id],
    average:
      territoryCounts[territory.id] > 0
        ? territoryTotals[territory.id] / territoryCounts[territory.id]
        : 0,
  }))
}
