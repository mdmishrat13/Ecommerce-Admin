import { ServerIcon } from "lucide-react"
import { Alert, AlertTitle } from "./alert"
import { Badge, BadgeProps } from "./badge"

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
  return (
    <Alert> 
      <ServerIcon className="w-4 h-4"/>
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={VariantMap[variant]}>{TextMap[variant]}</Badge>
        </AlertTitle>
    </Alert>
  )
}

export default ApiAlert