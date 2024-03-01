import prismaDb from '@/lib/prismaDb'
import React from 'react'
import ColorForm from './components/ColorForm'

const page = async ({ params }: { params: { colorId: string } }) => {
  const colors = await prismaDb.color.findFirst({
    where: {
      id:params.colorId
    }
  })
  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={colors} />
      </div>
    </div>
  )
}

export default page