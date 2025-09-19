
import React, { useState } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type Column,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useCompanyOverview } from "../../hooks/useCompanyOverview";
import type { CompanyOverview } from "../../db/schema";
import {
  Filter,
  MoreHorizontal,
  Search,
  Settings2,
} from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { TierBadge } from "@/components/ui/tier-badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Types
type TableData = CompanyOverview;

interface FilterOption {
  label: string;
  value: string;
}

interface ColumnFilterProps {
  column: Column<TableData, unknown>;
  title: string;
  options: FilterOption[];
}

// Revenue Filter Component
function RevenueFilter({ minRevenue, setMinRevenue }: { minRevenue: number | null; setMinRevenue: (value: number | null) => void }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
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
                onChange={(e) => {
                  const value = e.target.value;
                  setMinRevenue(value ? parseFloat(value) : null);
                }}
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
                onClick={() => setMinRevenue(null)}
                className="h-8 w-full justify-center text-center"
              >
                Clear filter
              </Button>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

// Column Filter Component
function ColumnFilter({ column, title, options }: ColumnFilterProps) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <Filter className="mr-2 h-4 w-4" />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <div className="ml-2 h-4 w-px bg-border" />
              <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge variant="secondary" key={option.value} className="rounded-sm px-1 font-normal">
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <div className="p-2">
          <div className="space-y-2">
            {options.map((option) => {
              const isSelected = selectedValues.has(option.value);
              return (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.value}
                    checked={isSelected}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        selectedValues.add(option.value);
                      } else {
                        selectedValues.delete(option.value);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(filterValues.length ? filterValues : undefined);
                    }}
                  />
                  <label
                    htmlFor={option.value}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option.label}
                    {facets?.get(option.value) && (
                      <span className="ml-auto text-xs text-muted-foreground">
                        ({facets.get(option.value)})
                      </span>
                    )}
                  </label>
                </div>
              );
            })}
          </div>
          {selectedValues.size > 0 && (
            <>
              <div className="my-2 h-px bg-border" />
              <Button
                variant="ghost"
                onClick={() => column?.setFilterValue(undefined)}
                className="h-8 w-full justify-center text-center"
              >
                Clear filters
              </Button>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

// Column Header Component
function DataTableColumnHeader({ column, title }: { column: Column<TableData, unknown>; title: string }) {
  if (!column.getCanSort()) {
    return <div className="text-left">{title}</div>;
  }

  return (
    <div className="flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// Main Data Table Component
function DataTableWithFilters() {
  const { data, loading, error } = useCompanyOverview();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [minRevenue, setMinRevenue] = useState<number | null>(null);

  // Load column visibility from localStorage on mount
  const [columnVisibility, setColumnVisibility] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('companies-table-column-visibility');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  // Save column visibility changes to localStorage
  const handleColumnVisibilityChange = (updaterOrValue: Record<string, boolean> | ((old: Record<string, boolean>) => Record<string, boolean>)) => {
    const newVisibility = typeof updaterOrValue === 'function' 
      ? updaterOrValue(columnVisibility) 
      : updaterOrValue;
    
    setColumnVisibility(newVisibility);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('companies-table-column-visibility', JSON.stringify(newVisibility));
    }
  };

  // Reset column visibility to show all columns
  const resetColumnVisibility = () => {
    const allVisible: Record<string, boolean> = {};
    table.getAllColumns().forEach(column => {
      allVisible[column.id] = true;
    });
    handleColumnVisibilityChange(allVisible);
  };

  const columns: ColumnDef<TableData>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "logoUrl",
      header: () => <div className="text-center">Logo</div>,
      cell: ({ row }) => {
        const logoUrl = row.getValue("logoUrl") as string;
        return (
          <div className="flex justify-center">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={`${row.getValue("englishName") || "Company"} logo`}
                className="h-8 w-8 rounded object-contain"
                onError={(e) => {
                  // Hide the image if it fails to load
                  e.currentTarget.style.display = 'none';
                }}
              />
            ) : (
              <div className="h-8 w-8 rounded bg-muted flex items-center justify-center text-xs text-muted-foreground">
                N/A
              </div>
            )}
          </div>
        );
      },
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: "englishName",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Company Name" />,
      cell: ({ row }) => <div className="font-medium">{row.getValue("englishName") || "N/A"}</div>,
    },
    {
      accessorKey: "companyName",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Display Name" />,
      cell: ({ row }) => <div className="text-muted-foreground">{row.getValue("companyName") || "N/A"}</div>,
    },
    {
      accessorKey: "country",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Country" />,
      cell: ({ row }) => <div>{row.getValue("country") || "N/A"}</div>,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "ceres_region",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Region" />,
      cell: ({ row }) => <div>{row.getValue("ceres_region") || "N/A"}</div>,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "primaryMarket",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Primary Market" />,
      cell: ({ row }) => <div>{row.getValue("primaryMarket") || "N/A"}</div>,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "businessModel",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Business Model" />,
      cell: ({ row }) => <div>{row.getValue("businessModel") || "N/A"}</div>,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "Tier",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Tier" />,
      cell: ({ row }) => {
        const tier = row.getValue("Tier") as string;
        return <TierBadge tier={tier} size="sm" />;
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
      size: 120, // Set minimum width for the column
      minSize: 100,
      maxSize: 150,
    },
    {
      accessorKey: "overallScore",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Overall Score" />,
      cell: ({ row }) => {
        const score = row.getValue("overallScore") as number;
        return (
          <div className="text-right font-medium">
            {score ? score.toFixed(1) : "N/A"}
          </div>
        );
      },
    },
    {
      accessorKey: "strategicFit",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Strategic Fit" />,
      cell: ({ row }) => {
        const score = row.getValue("strategicFit") as number;
        return (
          <div className="text-right">
            {score ? score.toFixed(1) : "N/A"}
          </div>
        );
      },
    },
    {
      accessorKey: "abilityToExecute",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Ability to Execute" />,
      cell: ({ row }) => {
        const score = row.getValue("abilityToExecute") as number;
        return (
          <div className="text-right">
            {score ? score.toFixed(1) : "N/A"}
          </div>
        );
      },
    },
    {
      accessorKey: "annual_revenue",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Annual Revenue" />,
      cell: ({ row }) => {
        const revenue = row.getValue("annual_revenue") as number;
        if (!revenue) return <div className="text-right">N/A</div>;
        // Format as $XXB (assuming revenue is already in billions)
        const formatted = `$${revenue.toFixed(0)}B`;
        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "finance_score",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Finance Score" />,
      cell: ({ row }) => {
        const score = row.getValue("finance_score") as number;
        return (
          <div className="text-right">
            {score ? score.toFixed(1) : "N/A"}
          </div>
        );
      },
    },
    {
      accessorKey: "H2Score",
      header: ({ column }) => <DataTableColumnHeader column={column} title="H2 Score" />,
      cell: ({ row }) => {
        const score = row.getValue("H2Score") as number;
        return (
          <div className="text-right">
            {score ? score.toFixed(1) : "N/A"}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(item.key?.toString() || "")}>
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  // Filter data based on minimum revenue
  const filteredData = React.useMemo(() => {
    if (minRevenue === null) return data;
    return data.filter(item => {
      const revenue = item.annual_revenue;
      return revenue && revenue >= minRevenue;
    });
  }, [data, minRevenue]);

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: handleColumnVisibilityChange,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  // Dynamically generate filter options from actual data
  const tierOptions: FilterOption[] = React.useMemo(() => {
    const tiers = Array.from(new Set(data.map(item => item.Tier).filter(Boolean)));
    return tiers.map(tier => ({ label: tier!, value: tier! }));
  }, [data]);

  const regionOptions: FilterOption[] = React.useMemo(() => {
    const regions = Array.from(new Set(data.map(item => item.ceres_region).filter(Boolean)));
    return regions.map(region => ({ label: region!, value: region! }));
  }, [data]);

  const marketOptions: FilterOption[] = React.useMemo(() => {
    const markets = Array.from(new Set(data.map(item => item.primaryMarket).filter(Boolean)));
    return markets.map(market => ({ label: market!, value: market! }));
  }, [data]);

  if (loading) {
    return (
      <div className="w-full space-y-4">
        <div className="flex items-center justify-center h-32">
          <div className="text-muted-foreground">Loading companies...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full space-y-4">
        <div className="flex items-center justify-center h-32">
          <div className="text-destructive">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search all columns..."
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(String(event.target.value))}
              className="pl-8 max-w-sm"
            />
          </div>
          {table.getColumn("Tier") && (
            <ColumnFilter
              column={table.getColumn("Tier")!}
              title="Tier"
              options={tierOptions}
            />
          )}
          {table.getColumn("ceres_region") && (
            <ColumnFilter
              column={table.getColumn("ceres_region")!}
              title="Region"
              options={regionOptions}
            />
          )}
          {table.getColumn("primaryMarket") && (
            <ColumnFilter
              column={table.getColumn("primaryMarket")!}
              title="Market"
              options={marketOptions}
            />
          )}
          <RevenueFilter minRevenue={minRevenue} setMinRevenue={setMinRevenue} />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto h-8">
              <Settings2 className="mr-2 h-4 w-4" />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={resetColumnVisibility} className="text-sm">
              Show all columns
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <div className="relative max-h-[600px] overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="sticky top-0 z-20 bg-background shadow-sm [&_tr]:border-b">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b">
                  {headerGroup.headers.map((header) => {
                    return (
                      <th 
                        key={header.id} 
                        className="h-12 px-4 text-left align-middle font-semibold text-muted-foreground bg-muted/50 [&:has([role=checkbox])]:pr-0"
                        style={{ width: header.getSize() }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <tr 
                    key={row.id} 
                    data-state={row.getIsSelected() && "selected"}
                    className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${index % 2 === 0 ? 'bg-background' : 'bg-muted/20'} hover:bg-muted/50 transition-colors`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-4 align-middle [&:has([role=checkbox])]:pr-0 py-3" style={{ width: cell.column.getSize() }}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="h-24 text-center p-4 align-middle [&:has([role=checkbox])]:pr-0">
                    No results.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <span className="text-sm font-bold">‹</span>
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <span className="text-sm font-bold">›</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CompaniesData() {
  return (
    <div className="container mx-auto py-10">
      <DataTableWithFilters />
    </div>
  );
}