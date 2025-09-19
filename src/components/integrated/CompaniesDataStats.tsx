import { useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarChart3, Users, Filter, Search } from 'lucide-react'
import type { CompanyOverview } from '../../db/schema'

interface CompaniesDataStatsProps {
  data: CompanyOverview[]
  filteredData: CompanyOverview[]
  selectedCompanyIds: Set<string>
  activeFilters: number
  hasGlobalFilter: boolean
}

export function CompaniesDataStats({
  data,
  filteredData,
  selectedCompanyIds,
  activeFilters,
  hasGlobalFilter,
}: CompaniesDataStatsProps) {
  // Calculate statistics from the actual data
  const stats = useMemo(() => {
    const totalCompanies = data.length
    const tier1Companies = data.filter(
      company => company.Tier === 'Tier 1'
    ).length
    const visibleCompanies = filteredData.length
    const totalActiveFilters = activeFilters + (hasGlobalFilter ? 1 : 0)

    return {
      totalCompanies,
      tier1Companies,
      visibleCompanies,
      activeFilters: totalActiveFilters,
      hasSelection: selectedCompanyIds.size > 0,
      selectedCount: selectedCompanyIds.size,
    }
  }, [data, filteredData, selectedCompanyIds, activeFilters, hasGlobalFilter])

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Total Companies */}
      <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Companies</p>
              <p className="text-2xl font-bold">{stats.totalCompanies}</p>
            </div>
            <BarChart3 className="h-8 w-8 text-blue-500" />
          </div>
          {stats.visibleCompanies !== stats.totalCompanies && (
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs">
                {stats.visibleCompanies} visible
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tier 1 Companies */}
      <Card className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Tier 1 Companies</p>
              <p className="text-2xl font-bold">{stats.tier1Companies}</p>
            </div>
            <Users className="h-8 w-8 text-green-500" />
          </div>
          {stats.totalCompanies > 0 && (
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs">
                {((stats.tier1Companies / stats.totalCompanies) * 100).toFixed(
                  1
                )}
                %
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Active Filters */}
      <Card className="border-l-4 border-l-orange-500 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Active Filters</p>
              <p className="text-2xl font-bold">{stats.activeFilters}</p>
            </div>
            <Filter className="h-8 w-8 text-orange-500" />
          </div>
          {stats.activeFilters > 0 && (
            <div className="mt-2">
              <Badge variant="secondary" className="text-xs">
                {stats.visibleCompanies} results
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Selected */}
      <Card className="border-l-4 border-l-purple-500 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Selected</p>
              <p className="text-2xl font-bold">{stats.selectedCount}</p>
            </div>
            <Search className="h-8 w-8 text-purple-500" />
          </div>
          {stats.hasSelection && (
            <div className="mt-2">
              <Badge
                variant="secondary"
                className="text-xs truncate max-w-full"
              >
                {stats.selectedCount} selected
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
