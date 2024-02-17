'use client'
import { Modal } from '@/components/ui/modal'
import { useStoreModal } from '@/hooks/use-modal-hooks'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const formSchema = z.object({
  name: z.string().min(1)
})

export function StoreModal() {
  const storeModal = useStoreModal()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
  })
  const [loading,setLoading] = useState(false)


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      
      const response =await axios.post('/api/stores',values)
      window.location.assign(`/${response.data.id}`)
    } catch (error) {
      toast.error('Something went wrong!')
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <Modal
      title='test modal'
      description='testing the modal'
      onClose={storeModal.onClose}
      isOpen={storeModal.isOpen}>
      <div className="">
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder='E-Commerce...'{...field}/>
                    </FormControl>
                      <FormMessage/>

                  </FormItem>
                )} />
            <div className="pt-6 space-x-2 flex justify-end items-center">
              <Button disabled={loading} variant='outline' onClick={storeModal.onClose}>Cancel</Button>
              <Button disabled={loading} type='submit'>Continue</Button>
            </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>

  )
}