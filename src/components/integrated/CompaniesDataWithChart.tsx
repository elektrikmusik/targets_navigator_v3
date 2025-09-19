import { useState } from "react";
import {
  type ColumnDef,
  type SortingState,
  type Column,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useCompanyOverview } from "../../hooks/useCompanyOverview";
import { useCompanyFilters } from "../../hooks/useCompanyFilters";
import type { CompanyOverview } from "../../db/schema";
import {
  MoreHorizontal,
  Settings2,
} from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { BubbleChart } from "../charts/BubbleChart";
import { CompaniesDataStats } from "./CompaniesDataStats";
import { CompanyFiltersToolbar } from "../filters/CompanyFiltersToolbar";

// Types
type TableData = CompanyOverview;


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

// Main integrated component
export function CompaniesDataWithChart() {
  const { data, loading, error } = useCompanyOverview();
  const {
    state: filterState,
    actions: filterActions,
    filterOptions,
    filteredData,
  } = useCompanyFilters(data);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);
  const [renderLogos, setRenderLogos] = useState(false);

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
          onCheckedChange={(value) => {
            // Use the same naming logic as the chart
            const englishName = row.getValue("englishName") as string;
            const companyName = row.getValue("companyName") as string;
            const chartId = englishName || companyName || 'Unknown';

            // Clear all selections first
            table.resetRowSelection();

            if (value) {
              row.toggleSelected(true);
              setSelectedCompanyId(chartId);
            } else {
              setSelectedCompanyId(null);
            }
          }}
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
      cell: ({ row }) => {
        const englishName = row.getValue("englishName") as string;
        const companyName = row.getValue("companyName") as string;
        const chartId = englishName || companyName || 'Unknown';
        const isHighlighted = selectedCompanyId === chartId;

        return (
          <div
            className={`cursor-pointer ${isHighlighted ? 'bg-blue-100 px-2 py-1 rounded' : ''}`}
            onClick={() => {
              const newSelectedId = chartId === selectedCompanyId ? null : chartId;
              console.log('Company name clicked. Chart ID:', chartId, 'New selected ID:', newSelectedId);
              setSelectedCompanyId(newSelectedId);

              // Clear all selections and select this row if needed
              table.resetRowSelection();
              if (newSelectedId) {
                row.toggleSelected(true);
              }
            }}
          >
            <div className="font-semibold text-foreground">
              {englishName || "N/A"}
            </div>
            {companyName && (
              <div className="text-xs text-muted-foreground mt-1">
                {companyName}
              </div>
            )}
          </div>
        );
      },
      size: 300,
      minSize: 180,
      maxSize: 450,
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
      size: 120,
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
        const formatted = `$${revenue.toFixed(0)}B`;
        return <div className="text-right font-medium">{formatted}</div>;
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
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: handleColumnVisibilityChange,
    onRowSelectionChange: setRowSelection,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
  });

  // Get selected values from filter state
  const selectedTiers = filterState.columnFilters.find(f => f.id === 'Tier')?.value || [];
  const selectedRegions = filterState.columnFilters.find(f => f.id === 'ceres_region')?.value || [];
  const selectedMarkets = filterState.columnFilters.find(f => f.id === 'primaryMarket')?.value || [];
  const selectedBusinessModels = filterState.columnFilters.find(f => f.id === 'businessModel')?.value || [];

  
  // Handle chart node click
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChartNodeClick = (node: any) => {
    // The node ID should match what we set in the chart (englishName || companyName || 'Unknown')
    const chartId = node.data.id;
    const newSelectedId = chartId === selectedCompanyId ? null : chartId;
    setSelectedCompanyId(newSelectedId);

    // Clear all previous selections and select the corresponding row
    table.resetRowSelection();

    if (newSelectedId) {
      const tableRow = table.getRowModel().rows.find(row => {
        const englishName = row.getValue("englishName") as string;
        const companyName = row.getValue("companyName") as string;
        const rowChartId = englishName || companyName || 'Unknown';
        return rowChartId === newSelectedId;
      });

      if (tableRow) {
        tableRow.toggleSelected(true);
      }
    }
  };

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
      {/* Dynamic Statistics Cards */}
      <CompaniesDataStats
        data={data}
        filteredData={filteredData}
        selectedCompanyId={selectedCompanyId}
        activeFilters={filterActions.activeFiltersCount}
        hasGlobalFilter={!!filterState.globalFilter}
      />

      {/* Filters Card */}
      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Filters & Search</h3>
        <CompanyFiltersToolbar
          searchValue={filterState.globalFilter}
          onSearchChange={filterActions.setGlobalFilter}
          tierOptions={filterOptions.tiers}
          selectedTiers={selectedTiers}
          onTiersChange={(values) => filterActions.setColumnFilter('Tier', values)}
          regionOptions={filterOptions.regions}
          selectedRegions={selectedRegions}
          onRegionsChange={(values) => filterActions.setColumnFilter('ceres_region', values)}
          marketOptions={filterOptions.markets}
          selectedMarkets={selectedMarkets}
          onMarketsChange={(values) => filterActions.setColumnFilter('primaryMarket', values)}
          businessModelOptions={filterOptions.businessModels}
          selectedBusinessModels={selectedBusinessModels}
          onBusinessModelsChange={(values) => filterActions.setColumnFilter('businessModel', values)}
          minRevenue={filterState.minRevenue}
          onMinRevenueChange={filterActions.setMinRevenue}
          onClearAllFilters={filterActions.clearAllFilters}
          activeFiltersCount={filterActions.activeFiltersCount}
        />
      </div>

      {/* Main Layout: Table + Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Table Card */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border bg-card p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Companies Data</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8">
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
                    .map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Table */}
            <div className="rounded-md border flex-1 flex flex-col">
              <div className="flex-1 overflow-auto">
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

              {/* Pagination */}
              <div className="flex items-center justify-between space-x-2 p-4 border-t bg-muted/20">
                <div className="flex-1 text-sm text-muted-foreground">
                  {table.getFilteredSelectedRowModel().rows.length} of{" "}
                  {table.getFilteredRowModel().rows.length} row(s) selected.
                  {selectedCompanyId && (
                    <span className="ml-4 font-medium text-blue-600">
                      Highlighted: {selectedCompanyId}
                    </span>
                  )}
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
          </div>
        </div>

        {/* Chart Card */}
        <div className="lg:col-span-2">
          <div className="rounded-lg border bg-card p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Company Positioning Chart</h3>
              <div className="flex items-center space-x-2">
                <Switch
                  id="render-logos"
                  checked={renderLogos}
                  onCheckedChange={setRenderLogos}
                />
                <Label htmlFor="render-logos" className="text-sm">
                  Render Logos
                </Label>
              </div>
            </div>
            <div className="flex-1 min-h-0">
              <div className="h-full w-full">
                <BubbleChart
                  data={filteredData}
                  xScaleMin={0}
                  xScaleMax={10}
                  yScaleMin={0}
                  yScaleMax={10}
                  nodeSize={30}
                  onNodeClick={handleChartNodeClick}
                  highlightedCompany={selectedCompanyId}
                  renderLogos={renderLogos}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
