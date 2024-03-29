'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BilboardColumn } from "./Column"
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import AlertModal from "@/components/modals/alert-modal";

interface CellActionProps{
    data: BilboardColumn;
}

  
const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const params = useParams()
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [open,setOpen] = useState(false)

    const onDelete = async()=>{
        try {
            setLoading(true)
          await axios.delete(`/api/${params.storeId}/bilboards/${data.id}`)
            router.refresh()
            router.push(`/${params.storeId}/bilboards`)
          toast.success('Deleted Successfully!')
        } catch (error) {
          toast.error('Something went wrong!')
        }
        finally {
            setLoading(false)
            setOpen(false)
        }
    }
    
    const onCopy =(id:string)=>{
        navigator.clipboard.writeText(id)
        toast.success('Coppied to clipboard!')
    }

  return (
      <>
          <AlertModal loading={ loading} isOpen={open} onClose={()=>setOpen(false)} onConfirm={onDelete}/>
      <DropdownMenu>
          <DropdownMenuTrigger asChild>
              <Button className="w-8 h-8 p-0" variant='ghost'>
                  <span className="sr-only">Open Menu</span>
                  <MoreHorizontal className="w-4 h-4"/>
              </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                  Actions
              </DropdownMenuLabel>
              <DropdownMenuItem onClick={()=>onCopy(data.id)}>
                  <Copy className="w-4 h-4 mr-2"/> Copy Id
                </DropdownMenuItem>
              <DropdownMenuItem onClick={()=>router.push(`/${params.storeId}/bilboards/${data.id}`)}>
                  <Edit className="w-4 h-4 mr-2"/> Update
              </DropdownMenuItem>
              <DropdownMenuItem onClick={()=>setOpen(true)}>
                  <Trash className="w-4 h-4 mr-2"/> Delete
              </DropdownMenuItem>
          </DropdownMenuContent>
    </DropdownMenu></>
  )
}

export default CellAction