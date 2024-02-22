'use client'

import * as z from 'zod'

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Billboard} from "@prisma/client"
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
import ApiAlert from '@/components/ui/api-alert'
import useOrigin from '@/hooks/use-origin'

interface BilboardFormProps{
  initialData:Billboard | null
}

const fromSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1)
})

type BilboardPropsValues = z.infer<typeof fromSchema>
const BilboardForm:React.FC<BilboardFormProps> = ({initialData}) => {

  const params = useParams()
  const router = useRouter()
  const origin = useOrigin()

  const title = initialData?'Edit Title':'Create Title'
  const description = initialData?'Edit Description':'Create Description'
  const toastMessage = initialData ? 'Bilboard Updated' : 'Bilboard Created'
  const action = initialData ? 'Save' : 'Create'
  

  if(!params.storeId){
    redirect('/')
  }

  const [open,setOpen] = useState(false)
  const [loading,setLoading] = useState(false)

  const form = useForm<BilboardPropsValues>({
    resolver:zodResolver(fromSchema),
    defaultValues: initialData || {
      label: '',
      imageUrl:''
    }
  })

  const onSubmit = async(data:BilboardPropsValues)=>{
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
            <FormField control={form.control} name='label' render={({field})=>(
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder='Bilboard Name'{...field}/>
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

export default BilboardForm