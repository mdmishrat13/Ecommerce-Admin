"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"
export type SizeColumn = {
  id: string
  name: string,
  value:string,
  createdAt: string
}

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "name",
  },
  {
    accessorKey: "value",
    header: "value",
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
