'use client'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Category, Color, Image, Product, Size} from "@prisma/client"
import { Trash } from "lucide-react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import axios from 'axios'
import { redirect, useParams, useRouter } from 'next/navigation'
import AlertModal from '@/components/modals/alert-modal'
import useOrigin from '@/hooks/use-origin'
import ImageUpload from '@/components/ui/ImageUpload'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from "@/components/ui/checkbox"


interface ProductFormProps{
  initialData: Product & {
    images: Image[]
  } | null;
  categories: Category[]
  colors: Color[]
  sizes:Size[]
}

const fromSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  sizeId: z.string().min(1),
  colorId: z.string().min(1),
  featured: z.boolean().default(false).optional(),
  archived: z.boolean().default(false).optional(),
})

type ProductPropsValues = z.infer<typeof fromSchema>
const ProductForm: React.FC<ProductFormProps> = ({ initialData,colors,sizes,categories }) => {
  
  console.log(initialData)

  const params = useParams()
  const router = useRouter()
  const origin = useOrigin()

  const title = initialData?'Edit Products':'Create Products'
  const description = initialData?'Edit Your Products':'Create New Products'
  const toastMessage = initialData ? 'Product Updated' : 'Product Created'
  const action = initialData ? 'Save' : 'Create'
  

  if(!params.storeId){
    redirect('/')
  }

  const [open,setOpen] = useState(false)
  const [loading,setLoading] = useState(false)

  const form = useForm<ProductPropsValues>({
    resolver:zodResolver(fromSchema),
    defaultValues: initialData?{...initialData,price:parseFloat(String(initialData?.price))}:{
      name: '',
      images: [],
      price: 0,
      categoryId: '',
      colorId: '',
      sizeId: '',
      featured: false,
      archived:false,
    }
  })

  const onSubmit = async(data:ProductPropsValues)=>{
   try {
    setLoading(true)
     if (initialData) {
       await axios.patch(`/api/${params.storeId}/products/${params.bilboardId}`, data)
       console.log('Product updated')
     }
     else {
       await axios.post(`/api/${params.storeId}/products`, data)
      }
      toast.success(toastMessage)
      router.refresh()
      router.push(`/${params.storeId}/products/${params.bilboardId}`)

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
      await axios.patch(`/api/${params.storeId}/products/${params.bilboardId}`)
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
        <FormField control={form.control} name='images' render={({field})=>(
              <FormItem>
                <FormLabel>Background Image</FormLabel>
                <FormControl>
                <ImageUpload
                  value={field.value.map(image=>image.url)}
                  disabled={loading}
                  onChange={(url) => field.onChange([...field.value,{url}])}
                onRemove={(url)=>field.onChange([...field.value.filter(current=>current.url!==url)])}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
        <div className="grid grid-cols-3 gap-8">
            <FormField control={form.control} name='name' render={({field})=>(
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input disabled={loading} placeholder='Product Name'{...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name='price' render={({field})=>(
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type='number' disabled={loading} placeholder='9.99'{...field}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )} />
            <FormField control={form.control} name='categoryId' render={({field})=>(
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} placeholder='Select a Category...' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                      { category.name}
                    </SelectItem>))}
                  </SelectContent>
                </Select>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name='sizeId' render={({field})=>(
              <FormItem>
                <FormLabel>Size</FormLabel>
                <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} placeholder='Select a Size...' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sizes.map(size => (
                      <SelectItem key={size.id} value={size.id}>
                      { size.name}
                    </SelectItem>))}
                  </SelectContent>
                </Select>
                <FormMessage/>
              </FormItem>
            )}/>
            <FormField control={form.control} name='colorId' render={({field})=>(
              <FormItem>
                <FormLabel>Color</FormLabel>
                <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={field.value} placeholder='Select a Color...' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {colors.map(color => (
                      <SelectItem key={color.id} value={color.id}>
                        <div className="flex gap-x-4 items-center">
                        { color.name}
                        <div className='p-2 border rounded-full' style={{backgroundColor:color.value}}/>
                      </div>
                        
                    </SelectItem>))}
                  </SelectContent>
                </Select>
                <FormMessage/>
              </FormItem>
            )} />
            <FormField control={form.control} name='featured' render={({field})=>(
              <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Featured</FormLabel>
                  <FormDescription>This product will appear on the home page</FormDescription>
                </div>
              </FormItem>
            )} />
            <FormField control={form.control} name='archived' render={({field})=>(
              <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Archived</FormLabel>
                  <FormDescription>This product will not appear on any page</FormDescription>
                </div>
              </FormItem>
            )} />
        </div>
          <Button disabled={loading} type='submit' className='ml-auto'>{action }</Button>
      </form>
    </Form>
    </>
  )
}

export default ProductForm