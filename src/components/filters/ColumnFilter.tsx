import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Filter } from 'lucide-react'
import type { FilterOption } from '@/hooks/useCompanyFilters'

interface ColumnFilterProps {
  title: string
  options: FilterOption[]
  selectedValues: string[]
  onValueChange: (values: string[]) => void
  onClear?: () => void
  facets?: Map<string, number>
  className?: string
}

export function ColumnFilter({
  title,
  options,
  selectedValues,
  onValueChange,
  onClear,
  facets,
  className = '',
}: ColumnFilterProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleValueChange = (value: string, checked: boolean) => {
    const newValues = new Set(selectedValues)
    if (checked) {
      newValues.add(value)
    } else {
      newValues.delete(value)
    }
    onValueChange(Array.from(newValues))
  }

  const clearFilter = () => {
    onValueChange([])
    onClear?.()
    setIsOpen(false)
  }

  const selectedCount = selectedValues.length

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`h-8 border-dashed ${className}`}
        >
          <Filter className="mr-2 h-4 w-4" />
          {title}
          {selectedCount > 0 && (
            <>
              <div className="ml-2 h-4 w-px bg-border" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal"
              >
                {selectedCount}
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <div className="p-2">
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {options.map(option => {
              const isSelected = selectedValues.includes(option.value)
              const count = facets?.get(option.value)

              return (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.value}
                    checked={isSelected}
                    onCheckedChange={checked =>
                      handleValueChange(option.value, !!checked)
                    }
                  />
                  <label
                    htmlFor={option.value}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center justify-between w-full"
                  >
                    <span>{option.label}</span>
                    {count && (
                      <span className="ml-auto text-xs text-muted-foreground">
                        ({count})
                      </span>
                    )}
                  </label>
                </div>
              )
            })}
          </div>
          {selectedCount > 0 && (
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
