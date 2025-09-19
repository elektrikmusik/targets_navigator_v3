import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Filter } from 'lucide-react'

interface RevenueFilterProps {
  minRevenue: number | null
  onValueChange: (value: number | null) => void
  className?: string
}

export function RevenueFilter({
  minRevenue,
  onValueChange,
  className = ""
}: RevenueFilterProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleValueChange = (value: string) => {
    const numValue = value ? parseFloat(value) : null
    onValueChange(numValue)
  }

  const clearFilter = () => {
    onValueChange(null)
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className={`h-8 border-dashed ${className}`}>
          <Filter className="mr-2 h-4 w-4" />
          Min Revenue
          {minRevenue !== null && (
            <>
              <div className="ml-2 h-4 w-px bg-border" />
              <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                ${minRevenue}B+
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <div className="p-2">
          <div className="space-y-2">
            <div className="space-y-1">
              <label className="text-sm font-medium">Minimum Revenue (Billions)</label>
              <Input
                type="number"
                placeholder="Enter minimum revenue"
                value={minRevenue || ""}
                onChange={(e) => handleValueChange(e.target.value)}
                min="0"
                step="0.1"
              />
            </div>
          </div>
          {minRevenue !== null && (
            <>
              <div className="my-2 h-px bg-border" />
              <Button
                variant="ghost"
                onClick={clearFilter}
                className="h-8 w-full justify-center text-center"
              >
                Clear filter
              </Button>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}