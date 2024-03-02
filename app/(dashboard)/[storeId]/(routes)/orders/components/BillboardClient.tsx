'use client'
import Heading from '@/components/ui/heading'
import { OrderColumn, columns } from './Column'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/DataTable'

interface OrderClientProps{
  initialData:OrderColumn[]
}

const BillboardClient:React.FC<OrderClientProps> = ({initialData}) => {
  return (
    <>
      <Heading title={`Orders(${initialData?.length})`} description='Manage your Orders' />
      <Separator />
      <DataTable columns={columns} data={initialData} searchKey={'name'} />
      </>
  )
}

export default BillboardClient