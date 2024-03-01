'use client'
import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { ColorColumn, columns } from './Column'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/DataTable'
import ApiList from '@/components/ui/ApiList'

interface ColorClientProps{
  initialData:ColorColumn[]
}

const ColorClient:React.FC<ColorClientProps> = ({initialData}) => {
    const router = useRouter()
    const params = useParams()
  return (
    <>
      <div className='flex items-center justify-between'>
          <Heading title={`Colors(${initialData?.length})`} description='Manage your Colors' />
          <Button onClick={()=>{router.push(`/${params.storeId}/colors/new`)}}>
          <Plus className='mr-2 h-4 w-4'/> Add New
      </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={initialData} searchKey={'label'} />
      <Heading title='API' description='Api calls for Colors'/>
      <Separator />
      <ApiList entityIdName='colorId' entityName='colors'/>
      </>
  )
}

export default ColorClient