import prismaDb from '@/lib/prismaDb'
import React from 'react'
import BilboardForm from './components/ProductForm'

const page = async ({ params }: { params: { bilboardId: string } }) => {
  const bilboard = await prismaDb.billboard.findFirst({
    where: {
      id:params.bilboardId
    }
  })
  console.log('consoling billboard',bilboard)
  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BilboardForm initialData={bilboard} />
      </div>
    </div>
  )
}

export default page