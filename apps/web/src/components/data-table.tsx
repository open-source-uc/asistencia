/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface RowProps {
  getIsSelected: () => boolean;
  toggleSelected: (value?: boolean) => void;
  getValue: (key: string) => any;
}

export const SelectColumn = {
  id: "select",
  header: ({ table }: { table: any }) => (
    <Checkbox
      checked={table.getIsAllPageRowsSelected()}
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  ),
  cell: ({ row }: { row: RowProps }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  ),
  enableSorting: false,
  enableHiding: false,
};

export const SortingColumn = (header: string, accessorKey: string) => ({
  accessorKey,
  header: ({ column }: { column: any }) => {
    return (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {header}
        <ArrowUpIcon
          className={cn(
            "ml-2 h-4 w-4 transform transition-all",
            column.getIsSorted() === "desc" ? "rotate-180" : ""
          )}
          size={16}
        />
      </Button>
    );
  },
  cell: ({ row }: { row: RowProps }) => <div>{row.getValue(accessorKey)}</div>,
});

export const DateColumn = (header: string, accessorKey: string) => ({
  accessorKey,
  sortType: "datetime",
  header: ({ column }: { column: any }) => {
    return (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {header}
        <ArrowUpIcon
          className={cn(
            "ml-2 h-4 w-4 transform transition-all",
            column.getIsSorted() === "asc" ? "" : "rotate-180"
          )}
          size={16}
        />
      </Button>
    );
  },
  cell: ({ row }: { row: RowProps }) => {
    const date = new Date(row.getValue(accessorKey)).toLocaleDateString();
    return <div>{date}</div>;
  },
});
// a column that has an array of strings as its value
export const ArrayColumn = (header: string, accessorKey: string) => ({
  accessorKey,
  header,
  cell: ({ row }: { row: RowProps }) => {
    const value = row.getValue(accessorKey);
    return (
      <div className="flex flex-col gap-1">
        {value.map((item: string) => (
          <div key={item} className="px-2 py-1 bg-slate-100 rounded">
            {item}
          </div>
        ))}
      </div>
    );
  },
});

export const GenericColumn = (
  header: string,
  accessorKey: string,
  formatCellValue: (value: string) => string = (value) => value
) => ({
  accessorKey,
  header,
  cell: ({ row }: { row: RowProps }) => (
    <div>{formatCellValue(row.getValue(accessorKey))}</div>
  ),
});

export interface RowSelection {
  [key: string]: boolean;
}

export function DataTable({
  data,
  columns,
  searchColumn = null,
  rowSelection = {},
  setRowSelection = () => {},
  className = "",
  upperComponent = null,
}: {
  data: unknown[];
  columns: ColumnDef<any>[];
  searchColumn?: string | null;
  rowSelection?: RowSelection;
  setRowSelection?: React.Dispatch<React.SetStateAction<RowSelection>>;
  className?: string;
  upperComponent?: React.ReactNode;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });

  return (
    <div className={"flex flex-col space-y-4"}>
      {searchColumn && (
        <div className="flex justify-between items-center py-4">
          <Input
            placeholder="Buscar..."
            value={
              (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchColumn)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          {upperComponent}
        </div>
      )}
      <div className={cn("rounded-md border", className)}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sin resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} elemento(s) seleccionado(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
