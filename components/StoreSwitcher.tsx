'use client'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import { useStoreModal } from '@/hooks/use-modal-hooks'
import { Store } from '@prisma/client'
import { useParams,useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from './ui/button'
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Command, CommandList,CommandEmpty, CommandInput, CommandGroup, CommandItem, CommandSeparator  } from './ui/command'

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>
interface StoreSwitcherProps extends PopoverTriggerProps {
    items:Store[],

}
const StoreSwitcher = ({className,items}:StoreSwitcherProps) => {
    const StoreModal = useStoreModal()
    const params = useParams()
    const router = useRouter()
    const formattedItems = items.map(item=>({
      value:item.id,
      label:item.name
    }))

    const currentStore = formattedItems.find(item=>item.value===params.storeId)
    const [isOpen, setIsOpen] = useState(false)

    const onStoreSelect = (store:{value:string,label:string})=>{
      setIsOpen(false)
      router.push(`/${store.value}`)
    }
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' role='combobox' aria-expanded={isOpen} aria-label='Select A Store' className={cn('justify-between w-[200px]',className)}>
          <StoreIcon className='mr-2 w-4 h-4'/>
          {currentStore?.label}
        <ChevronsUpDown className='ml-auto opacity-50 shrink-0 h-4 w-4'/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandList>
            <CommandInput placeholder='Search Store...'/>
            <CommandEmpty>No store found</CommandEmpty>
            <CommandGroup heading='Stores'>
              {formattedItems.map(item=>(
                <CommandItem key={item.value} 
                onSelect={()=>onStoreSelect(item)}
                className='text-sm'>
                  <StoreIcon className='w-4 h-4 mr-2'/> 
                 {item.label}
                  <Check className={cn('ms-auto w-4 h-4',currentStore?.value===item.value?'opacity-100':'opacity-0')}>

                  </Check>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator/>
          <CommandList>
            <CommandGroup>
              <CommandItem onSelect={()=>{
                setIsOpen(false)
                
                StoreModal.onOpen()
              }}>
                <PlusCircle className='mr-2 h-5 w-5'/>
                Create Store

              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>

    </Popover>
  )
}

export default StoreSwitcher