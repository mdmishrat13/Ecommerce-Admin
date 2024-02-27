'use client'
import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { CategoryColumn, columns } from './Column'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/DataTable'
import ApiList from '@/components/ui/ApiList'

interface CategoryClientProps{
  initialData:CategoryColumn[]
}

const CategoryClient:React.FC<CategoryClientProps> = ({initialData}) => {
    const router = useRouter()
    const params = useParams()
  return (
    <>
      <div className='flex items-center justify-between'>
          <Heading title={`Categories(${initialData?.length})`} description='Manage your categories' />
          <Button onClick={()=>{router.push(`/${params.storeId}/categories/new`)}}>
          <Plus className='mr-2 h-4 w-4'/> Add New
      </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={initialData} searchKey={'name'} />
      <Heading title='API' description='Api calls for Categories'/>
      <Separator />
      <ApiList entityIdName='categoriyId' entityName='categories'/>
      </>
  )
}

export default CategoryClient