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

const BillboardClient: React.FC<ProductClientProps> = ({ initialData }) => {
    const router = useRouter()
    const params = useParams()
  return (
    <>
      <div className='flex items-center justify-between'>
          <Heading title={`Products(${initialData?.length})`} description='Manage your Products' />
          <Button onClick={()=>{router.push(`/${params.storeId}/products/new`)}}>
          <Plus className='mr-2 h-4 w-4'/> Add New
      </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={initialData} searchKey={'name'} />
      <Heading title='API' description='Api calls for products'/>
      <Separator />
      <ApiList entityIdName='productId' entityName='products'/>
      </>
  )
}

export default BillboardClient