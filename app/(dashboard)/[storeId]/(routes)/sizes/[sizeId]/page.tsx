import prismaDb from '@/lib/prismaDb'
import React from 'react'
import BilboardForm from './components/BilboardForm'

const page = async ({ params }: { params: { sizeId: string } }) => {
  const sizes = await prismaDb.size.findFirst({
    where: {
      id:params.sizeId
    }
  })
  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BilboardForm initialData={sizes} />
      </div>
    </div>
  )
}

export default page