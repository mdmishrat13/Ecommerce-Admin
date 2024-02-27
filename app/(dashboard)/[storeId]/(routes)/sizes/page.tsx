import { Separator } from '@/components/ui/separator'
import BillboardClient from './components/BillboardClient'
import prismaDb from '@/lib/prismaDb'
import { SizeColumn } from './components/Column'
import { format } from 'date-fns'

const page = async ({params}:{params:{storeId:string}}) => {
  const sizes = await prismaDb.size.findMany({
    where: {
      storeId:params.storeId
    },
    orderBy: {
      createdAt:'desc'
    }
  })

  const formattedsize: SizeColumn[] = sizes.map(item => ({
    id:item.id,
    name: item.name,
    value:item.value,
    createdAt: format(item.createdAt,'MMMM do, yyyy')
  }))

  return (
    <div className='flex-col'>
        <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient initialData={formattedsize} />
          <Separator/>
          </div>
    </div>
  )
}

export default page