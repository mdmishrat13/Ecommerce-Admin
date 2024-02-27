"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"
export type CategoryColumn = {
  id: string
  name: string
  billboardLabel: string
  createdAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell:({row})=>row.original.billboardLabel
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey:'id',
    id: "action",
    header:'Action',
    cell: ({row}) => <CellAction data={row.original} />,
  },
]
