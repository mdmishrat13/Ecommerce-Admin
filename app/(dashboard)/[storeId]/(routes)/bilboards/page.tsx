'use client'
import { Separator } from '@/components/ui/separator'
import BillboardClient from './components/BillboardClient'

const page = () => {
  return (
    <div className='flex-col'>
        <div className="flex-1 space-y-4 p-8 pt-6">
            <BillboardClient/>
          <Separator/>
          </div>
    </div>
  )
}

export default page