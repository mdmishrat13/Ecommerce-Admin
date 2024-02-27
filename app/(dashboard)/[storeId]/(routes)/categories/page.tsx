import { Separator } from '@/components/ui/separator'
import prismaDb from '@/lib/prismaDb'
import { format } from 'date-fns'
import CategoryClient from './components/CategoryClient'
import {CategoryColumn} from './components/Column'

const page = async ({params}:{params:{storeId:string}}) => {
  const categories = await prismaDb.category.findMany({
    where: {
      storeId:params.storeId
    },
    orderBy: {
      createdAt:'desc'
    },
    include:{
      billboard:true
    }
  })

  const formattedCategories: CategoryColumn[] = categories.map(item => ({
    id:item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt,'MMMM do, yyyy')
  }))

  return (
    <div className='flex-col'>
        <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient initialData={formattedCategories} />
          <Separator/>
          </div>
    </div>
  )
}

export default page