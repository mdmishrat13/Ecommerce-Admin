'use client'
import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { ProductColumn, columns } from './Column'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/DataTable'
import ApiList from '@/components/ui/ApiList'

interface ProductClientProps{
  initialData:ProductColumn[]
}

const BillboardClient:React.FC<ProductClientProps> = ({initialData}) => {
    const router = useRouter()
    const params = useParams()
  return (
    <>
      <div className='flex items-center justify-between'>
          <Heading title={`Billboards(${initialData?.length})`} description='Manage your bilboards' />
          <Button onClick={()=>{router.push(`/${params.storeId}/bilboards/new`)}}>
          <Plus className='mr-2 h-4 w-4'/> Add New
      </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={initialData} searchKey={'label'} />
      <Heading title='API' description='Api calls for billboards'/>
      <Separator />
      <ApiList entityIdName='bilboardId' entityName='bilboards'/>
      </>
  )
}

export default BillboardClient