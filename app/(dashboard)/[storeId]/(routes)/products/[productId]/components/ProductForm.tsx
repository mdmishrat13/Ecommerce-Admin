'use client'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Product} from "@prisma/client"
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
import ImageUpload from '@/components/ui/ImageUpload'

interface BilboardFormProps{
  initialData:Product | null
}

const fromSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1)
})

type ProductPropsValues = z.infer<typeof fromSchema>
const ProductForm: React.FC<BilboardFormProps> = ({ initialData }) => {
  
  console.log(initialData)

  const params = useParams()
  const router = useRouter()
  const origin = useOrigin()

  const title = initialData?'Edit Bilboards':'Create Bilboards'
  const description = initialData?'Edit Your Bilboards':'Create New Bilboards'
  const toastMessage = initialData ? 'Bilboard Updated' : 'Bilboard Created'
  const action = initialData ? 'Save' : 'Create'
  

  if(!params.storeId){
    redirect('/')
  }

  const [open,setOpen] = useState(false)
  const [loading,setLoading] = useState(false)

  const form = useForm<ProductPropsValues>({
    resolver:zodResolver(fromSchema),
    defaultValues: initialData || {
      name: '',
      id:''
    }
  })

  const onSubmit = async(data:ProductPropsValues)=>{
   try {
    setLoading(true)
     if (initialData) {
       await axios.patch(`/api/${params.storeId}/bilboards/${params.bilboardId}`, data)
       console.log('bilboard updated')
     }
     else {
       await axios.post(`/api/${params.storeId}/bilboards`, data)
      }
      toast.success(toastMessage)
      router.refresh()
      router.push(`/${params.storeId}/bilboards/${params.bilboardId}`)

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
      await axios.patch(`/api/${params.storeId}/bilboards/${params.bilboardId}`)
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
        <FormField control={form.control} name='name' render={({field})=>(
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                <ImageUpload
                  value={field.value ? [field.value] : []}
                  disabled={loading}
                  onChange={(url) => field.onChange(url)}
                onRemove={()=>field.onChange('')}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
        <div className="grid grid-cols-3 gap-8">
            <FormField control={form.control} name='id' render={({field})=>(
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder='Bilboard Name'{...field}/>
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

export default ProductForm