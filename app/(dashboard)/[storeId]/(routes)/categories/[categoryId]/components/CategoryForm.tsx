'use client'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Billboard, Category} from "@prisma/client"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface CategoryFormProps{
  initialData: Category | null,
  billboards:Billboard[]
}

const fromSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1)
})

type CategoryPropsValues = z.infer<typeof fromSchema>
const CategoryForm: React.FC<CategoryFormProps> = ({ initialData,billboards }) => {

  const params = useParams()
  const router = useRouter()
  const origin = useOrigin()

  const title = initialData?'Edit Category':'Create Category'
  const description = initialData?'Edit Your Category':'Create New Category'
  const toastMessage = initialData ? 'Category Updated' : 'Category Created'
  const action = initialData ? 'Save' : 'Create'
  

  if(!params.storeId){
    redirect('/')
  }

  const [open,setOpen] = useState(false)
  const [loading,setLoading] = useState(false)

  const form = useForm<CategoryPropsValues>({
    resolver:zodResolver(fromSchema),
    defaultValues: initialData || {
      name: '',
      billboardId:''
    }
  })

  const onSubmit = async(data:CategoryPropsValues)=>{
   try {
    setLoading(true)
     if (initialData) {
       await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, data)
     }
     else {
       await axios.post(`/api/${params.storeId}/categories`, data)
      }
      toast.success(toastMessage)
      router.refresh()
      router.push(`/${params.storeId}/categories/${params.categoryId}`)

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
      await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`)
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
                  <Input disabled={loading} placeholder='Category Name...'{...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name='billboardId' render={({field})=>(
              <FormItem>
                <FormLabel>Billboard</FormLabel>
                <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} placeholder='Select a billboard...' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {billboards.map(billboard => (
                      <SelectItem key={billboard.id} value={billboard.id}>
                      { billboard.label}
                    </SelectItem>))}
                  </SelectContent>
                </Select>
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

export default CategoryForm