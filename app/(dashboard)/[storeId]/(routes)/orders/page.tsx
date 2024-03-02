import { Separator } from '@/components/ui/separator'
import OrderClient from './components/BillboardClient'
import prismaDb from '@/lib/prismaDb'
import { OrderColumn } from './components/Column'
import { format } from 'date-fns'
import { formatter } from '@/lib/utils'

const page = async ({params}:{params:{storeId:string}}) => {
  const orders = await prismaDb.order.findMany({
    where: {
      storeId:params.storeId
    },
    include: {
      orderItems: {
        include: {
          product:true
        }
      }
    },
    orderBy: {
      createdAt:'desc'
    }
  })

  const formattedOreder: OrderColumn[] = orders.map(item => ({
    id: item.id,
    phone: item.phone,
    paid:item.paid,
    address: item.address,
    products: item.orderItems.map((orderItem) => orderItem.product.name).join(', '),
    totalPrice: formatter.format(item.orderItems.reduce((total, item) => {
      return total+Number(item.product.price)
    },0)),
    createdAt: format(item.createdAt,'MMMM do, yyyy')
  }))

  return (
    <div className='flex-col'>
        <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient initialData={formattedOreder} />
          <Separator/>
          </div>
    </div>
  )
}

export default page