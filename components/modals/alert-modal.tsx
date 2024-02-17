'use client'

import { Button } from "../ui/button"
import { Modal } from "../ui/modal"

interface AlertModalProps{
 isOpen:boolean,
 onClose:()=>void,
 onConfirm:()=>void,
 loading:boolean
}
const AlertModal:React.FC<AlertModalProps> = ({isOpen,onClose,onConfirm,loading}) => {
  return (
    <Modal
    title="Are You Sure?"
    description="This Action Can't be undone!"
    isOpen={isOpen}
    onClose={onClose}
    
    >
        <div className="flex justify-between items-center">
            <Button disabled={loading} variant='outline' onClick={onClose}>Cancel</Button>
            <Button disabled={loading} onClick={onConfirm}>Confirm</Button>
        </div>

    </Modal>
  )
}

export default AlertModal