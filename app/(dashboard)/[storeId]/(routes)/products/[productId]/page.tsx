import prismaDb from '@/lib/prismaDb'
import React from 'react'
import ProductForm from './components/ProductForm'

const page = async ({ params }: { params: { productId: string,storeId:string } }) => {
  const product = await prismaDb.product.findFirst({
    where: {
      id:params.productId
    },
    include: {
      images:true
    }
  })

  const categories = await prismaDb.category.findMany({
    where: {
      storeId:params.storeId
    }
  })
  const sizes = await prismaDb.size.findMany({
    where: {
      storeId:params.storeId
    }
  })
  const colors = await prismaDb.color.findMany({
    where: {
      storeId:params.storeId
    }
  })
  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm categories={categories} sizes={sizes} colors={colors} initialData={product} />
      </div>
    </div>
  )
}

export default page