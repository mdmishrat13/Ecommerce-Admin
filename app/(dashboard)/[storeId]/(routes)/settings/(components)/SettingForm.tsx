'use client'

import * as z from 'zod'

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Store } from "@prisma/client"
import { Trash } from "lucide-react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import axios from 'axios'
import { redirect, useParams, useRouter } from 'next/navigation'
import AlertModal from '@/components/modals/alert-modal'

interface SettingFormProps{
  initialData:Store
}

const fromSchema = z.object({
  name:z.string().min(1)
})

type SettingPropsValues = z.infer<typeof fromSchema>
const SettingForm:React.FC<SettingFormProps> = ({initialData}) => {

  const params = useParams()
  const router = useRouter()

  if(!params.storeId){
    redirect('/')
  }

  const [open,setOpen] = useState(false)
  const [loading,setLoading] = useState(false)

  const form = useForm<SettingPropsValues>({
    resolver:zodResolver(fromSchema),
    defaultValues:initialData
  })

  const onSubmit = async(data:SettingPropsValues)=>{
   try {
    setLoading(true)

    await axios.patch(`/api/stores/${params.storeId}`,data)
    router.refresh()
    toast.success('Store upadate successfully!')

   } catch (error) {
    toast.error('Something went wrong.')
    console.log(error)
   }
   finally{
    setLoading(false)
   }
  }

  const onDelete = async()=>{
    try {
      setLoading(true)
      await axios.delete(`/api/stores/${params.storeId}`)
      router.refresh()
      toast.success('Deleted Successfully!')
    } catch (error) {
      toast.error('Something went wrong!')
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <>
    <AlertModal isOpen={open} loading={loading} onClose={()=>{setOpen(false)}} onConfirm={onDelete}/>
    <div className="flex items-center justify-between">
      <Heading title='Settings' description="Customize your Settings"/>
      <Button variant='destructive' size='icon' onClick={()=>{setOpen(true)}}>
        <Trash className="w-4 h-4"/>
      </Button>
    </div>
    <Separator/>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className="grid grid-cols-3 gap-8">
            <FormField control={form.control} name='name' render={({field})=>(
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder='Store Name'{...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}>
            </FormField>
        </div>
        <Button disabled={loading} type='submit' className='ml-auto'>Save Changes</Button>
      </form>
    </Form>
    </>
  )
}

export default SettingForm