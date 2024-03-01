'use client'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import {Color} from "@prisma/client"
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
import useOrigin from '@/hooks/use-origin'

interface ColorFormProps{
  initialData:Color | null
}

const fromSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(4).regex(/^#/, {
    message:'String must be a hex code!'
  }),
})

type ColorPropsValues = z.infer<typeof fromSchema>
const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
  
  console.log(initialData)

  const params = useParams()
  const router = useRouter()

  const title = initialData?'Edit Colors':'Create Colors'
  const description = initialData?'Edit Your Color':'Create New Color'
  const toastMessage = initialData ? 'Color Updated' : 'Color Created'
  const action = initialData ? 'Save' : 'Create'
  

  if(!params.colorId){
    redirect('/')
  }

  const [open,setOpen] = useState(false)
  const [loading,setLoading] = useState(false)

  const form = useForm<ColorPropsValues>({
    resolver:zodResolver(fromSchema),
    defaultValues: initialData || {
      name: '',
      value:''
    }
  })

  const onSubmit = async(data:ColorPropsValues)=>{
   try {
    setLoading(true)
     if (initialData) {
       await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data)
     }
     else {
       await axios.post(`/api/${params.storeId}/colors`, data)
      }
      toast.success(toastMessage)
      router.refresh()
      router.push(`/${params.storeId}/colors/${params.colorId}`)

   } catch (error) {
    toast.error('Something went wrong.')
   }
   finally{
    setLoading(false)
   }
  }

  const onDelete = async()=>{
    try {
      setLoading(true)
      await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`)
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
    <div className="flex items-center justify-between py-4">
        <Heading title={title} description={description}/>
      {initialData&&(<Button variant='destructive' size='icon' onClick={()=>{setOpen(true)}}>
        <Trash className="w-4 h-4"/>
      </Button>)}
    </div>
    <Separator className='my-4'/>
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className="grid grid-cols-3 gap-8">
            <FormField control={form.control} name='name' render={({field})=>(
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder='Color Name'{...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name='value' render={({field})=>(
              <FormItem>
                <FormLabel>Value</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-x-4">
                    <Input disabled={loading} placeholder='Color value'{...field} />
                    <div className='p-4 border rounded-full' style={{backgroundColor:field.value}}/>
                  </div>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
        </div>
          <Button disabled={loading} type='submit' className='ml-auto'>{action }</Button>
      </form>
    </Form>
    </>
  )
}

export default ColorForm