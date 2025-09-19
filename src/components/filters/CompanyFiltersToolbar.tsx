import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { CompanySearch } from './CompanySearch'
import { ColumnFilter } from './ColumnFilter'
import { RevenueFilter } from './RevenueFilter'
import { X, Filter, RotateCcw } from 'lucide-react'
import type { FilterOption } from '@/hooks/useCompanyFilters'

interface CompanyFiltersToolbarProps {
  searchValue: string
  onSearchChange: (value: string) => void

  // Column filters
  tierOptions: FilterOption[]
  selectedTiers: string[]
  onTiersChange: (values: string[]) => void

  regionOptions: FilterOption[]
  selectedRegions: string[]
  onRegionsChange: (values: string[]) => void

  marketOptions: FilterOption[]
  selectedMarkets: string[]
  onMarketsChange: (values: string[]) => void

  businessModelOptions: FilterOption[]
  selectedBusinessModels: string[]
  onBusinessModelsChange: (values: string[]) => void

  // Revenue filter
  minRevenue: number | null
  onMinRevenueChange: (value: number | null) => void

  // Actions
  onClearAllFilters: () => void
  activeFiltersCount: number

  className?: string
  compact?: boolean
}

export function CompanyFiltersToolbar({
  searchValue,
  onSearchChange,
  tierOptions,
  selectedTiers,
  onTiersChange,
  regionOptions,
  selectedRegions,
  onRegionsChange,
  marketOptions,
  selectedMarkets,
  onMarketsChange,
  businessModelOptions,
  selectedBusinessModels,
  onBusinessModelsChange,
  minRevenue,
  onMinRevenueChange,
  onClearAllFilters,
  activeFiltersCount,
  className = '',
  compact = false,
}: CompanyFiltersToolbarProps) {
  const [showFilters, setShowFilters] = useState(false)

  const hasActiveFilters = activeFiltersCount > 0

  const getFilterRows = () => {
    const filters = []

    // Search filter
    if (searchValue) {
      filters.push({
        label: 'Search',
        value: searchValue,
        onClear: () => onSearchChange(''),
      })
    }

    // Tier filter
    if (selectedTiers.length > 0) {
      filters.push({
        label: 'Tier',
        value: selectedTiers.join(', '),
        onClear: () => onTiersChange([]),
      })
    }

    // Region filter
    if (selectedRegions.length > 0) {
      filters.push({
        label: 'Region',
        value: selectedRegions.join(', '),
        onClear: () => onRegionsChange([]),
      })
    }

    // Market filter
    if (selectedMarkets.length > 0) {
      filters.push({
        label: 'Market',
        value: selectedMarkets.join(', '),
        onClear: () => onMarketsChange([]),
      })
    }

    // Business model filter
    if (selectedBusinessModels.length > 0) {
      filters.push({
        label: 'Business Model',
        value: selectedBusinessModels.join(', '),
        onClear: () => onBusinessModelsChange([]),
      })
    }

    // Revenue filter
    if (minRevenue !== null) {
      filters.push({
        label: 'Min Revenue',
        value: `$${minRevenue}B+`,
        onClear: () => onMinRevenueChange(null),
      })
    }

    return filters
  }

  const activeFilters = getFilterRows()

  if (compact) {
    return (
      <div className={`space-y-2 ${className}`}>
        <div className="flex gap-2">
          <CompanySearch
            value={searchValue}
            onChange={onSearchChange}
            className="flex-1"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="h-10"
          >
            <Filter className="h-4 w-4" />
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-1">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </div>

        {showFilters && (
          <Card className="p-3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <ColumnFilter
                title="Tier"
                options={tierOptions}
                selectedValues={selectedTiers}
                onValueChange={onTiersChange}
              />
              <ColumnFilter
                title="Region"
                options={regionOptions}
                selectedValues={selectedRegions}
                onValueChange={onRegionsChange}
              />
              <ColumnFilter
                title="Market"
                options={marketOptions}
                selectedValues={selectedMarkets}
                onValueChange={onMarketsChange}
              />
              <RevenueFilter
                minRevenue={minRevenue}
                onValueChange={onMinRevenueChange}
              />
            </div>
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search and Filter Toggle */}
      <div className="flex gap-2">
        <CompanySearch
          value={searchValue}
          onChange={onSearchChange}
          className="flex-1"
        />
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="h-10"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={onClearAllFilters}
            className="h-10"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <Card className="p-3">
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="flex items-center gap-1"
              >
                <span className="font-medium">{filter.label}:</span>
                <span className="max-w-32 truncate">{filter.value}</span>
                <button
                  onClick={filter.onClear}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Filter Controls */}
      {showFilters && (
        <Card className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            <ColumnFilter
              title="Tier"
              options={tierOptions}
              selectedValues={selectedTiers}
              onValueChange={onTiersChange}
            />
            <ColumnFilter
              title="Region"
              options={regionOptions}
              selectedValues={selectedRegions}
              onValueChange={onRegionsChange}
            />
            <ColumnFilter
              title="Market"
              options={marketOptions}
              selectedValues={selectedMarkets}
              onValueChange={onMarketsChange}
            />
            <ColumnFilter
              title="Business Model"
              options={businessModelOptions}
              selectedValues={selectedBusinessModels}
              onValueChange={onBusinessModelsChange}
            />
            <RevenueFilter
              minRevenue={minRevenue}
              onValueChange={onMinRevenueChange}
            />
          </div>
        </Card>
      )}
    </div>
  )
}
