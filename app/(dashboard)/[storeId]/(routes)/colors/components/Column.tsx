"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"
export type ColorColumn = {
  id: string
  name: string,
  value:string,
  createdAt: string
}

export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "value",
    header: "value",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.value}
        <div className="w-6 h-6 rounded-full border" style={{backgroundColor:row.original.value}}></div>
    </div> )
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "action",
    cell: ({row}) => <CellAction data={row.original} />,
  },
]
