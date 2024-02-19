'use client'
import { Copy, ServerIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./alert"
import { Badge, BadgeProps } from "./badge"
import { Button } from "./button"
import toast from "react-hot-toast"

interface ApiAlertProps {
  title:string,
  description:string,
  variant:'Public' | 'Admin'
}

const TextMap:Record<ApiAlertProps['variant'],string> = {
  Public:'Public',
  Admin:'Admin'
}
const VariantMap: Record<ApiAlertProps['variant'],BadgeProps['variant']>={
  Public:'secondary',
  Admin:'destructive'
}

const ApiAlert:React.FC<ApiAlertProps> = ({title,description,variant="Public"}) => {
  const onCopy =()=>{
    navigator.clipboard.writeText(description)
    toast.success('Coppied to clipboard!')
  }
  return (
    <Alert> 
      <ServerIcon className="w-4 h-4"/>
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={VariantMap[variant]}>{TextMap[variant]}</Badge>
        </AlertTitle>
        <AlertDescription className="mt-4 flex items-center justify-between">
          <code className="relative rounded bg-muted py-[.2rem px-[.3rem] font-mono text-sm font-semibold" >
            {description}
          </code>
          <Button variant='outline' size='icon' onClick={onCopy}>
            <Copy className="w-4 h-4"/>
          </Button>
        </AlertDescription>
    </Alert>
  )
}

export default ApiAlert