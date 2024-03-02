"use client"

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction"
export type ProductColumn = {
  id: string
  name: string
  color: string
  size: string
  category: string
  price: string
  archived: boolean
  featured:boolean
  createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div>{row.original.name.length>=20?row.original.name.slice(0,20):row.original.name } ...</div>
    )
  },
  {
    accessorKey: "archived",
    header: "Archived",
  },
  {
    accessorKey: "featured",
    header: "Featured",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div className="p-2 rounded-full border"style={{backgroundColor:row.original.color}}/>
      </div>
    )
  },
 
  {
    id: "action",
    header:"Action",
    cell: ({row}) => <CellAction data={row.original} />,
  },
]
