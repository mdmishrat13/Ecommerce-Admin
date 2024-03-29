import { Separator } from '@/components/ui/separator'
import ProductClient from './components/ProductClient'
import prismaDb from '@/lib/prismaDb'
import { ProductColumn } from './components/Column'
import { format } from 'date-fns'
import { formatter } from '@/lib/utils'

const page = async ({params}:{params:{storeId:string}}) => {
  const products = await prismaDb.product.findMany({
    where: {
      storeId:params.storeId
    },
    include: {
      category: true,
      size: true,
      color:true,
    },
    orderBy: {
      createdAt:"desc"
    }
  })

  const formattedProduct: ProductColumn[] = products.map(item => ({
    id:item.id,
    name: item.name,
    featured: item.featured,
    archived: item.archived,
    price: formatter.format(item.price.toNumber()),
    category:item.category.name,
    size: item.size.name,
    color:item.color.name,
    createdAt: format(item.createdAt,'MMMM do, yyyy')
  }))

  return (
    <div className='flex-col'>
        <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient initialData={formattedProduct} />
          <Separator/>
          </div>
    </div>
  )
}

export default page