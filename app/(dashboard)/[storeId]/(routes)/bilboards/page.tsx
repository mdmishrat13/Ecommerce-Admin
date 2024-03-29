import { Separator } from '@/components/ui/separator'
import BillboardClient from './components/BillboardClient'
import prismaDb from '@/lib/prismaDb'
import { BilboardColumn } from './components/Column'
import { format } from 'date-fns'

const page = async ({params}:{params:{storeId:string}}) => {
  const bilboards = await prismaDb.billboard.findMany({
    where: {
      storeId:params.storeId
    },
    orderBy: {
      createdAt:'desc'
    }
  })

  const formattedBilboard: BilboardColumn[] = bilboards.map(item => ({
    id:item.id,
    label:item.label,
    createdAt: format(item.createdAt,'MMMM do, yyyy')
  }))

  return (
    <div className='flex-col'>
        <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient initialData={formattedBilboard} />
          <Separator/>
          </div>
    </div>
  )
}

export default page