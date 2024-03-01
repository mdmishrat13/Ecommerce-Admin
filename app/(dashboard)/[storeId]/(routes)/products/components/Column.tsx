"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"
export type ProductColumn = {
  id: string
  name: string
  createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "label",
    header: "label",
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
