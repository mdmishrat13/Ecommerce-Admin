'use client'
import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { SizeColumn, columns } from './Column'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/DataTable'
import ApiList from '@/components/ui/ApiList'

interface SizeClientProps{
  initialData:SizeColumn[]
}

const BillboardClient:React.FC<SizeClientProps> = ({initialData}) => {
    const router = useRouter()
    const params = useParams()
  return (
    <>
      <div className='flex items-center justify-between'>
          <Heading title={`Sizes(${initialData?.length})`} description='Manage your Sizes' />
          <Button onClick={()=>{router.push(`/${params.storeId}/sizes/new`)}}>
          <Plus className='mr-2 h-4 w-4'/> Add New
      </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={initialData} searchKey={'label'} />
      <Heading title='API' description='Api calls for billboards'/>
      <Separator />
      <ApiList entityIdName='sizeId' entityName='sizes'/>
      </>
  )
}

export default BillboardClient