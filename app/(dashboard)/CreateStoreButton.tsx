'use client'
import { Button } from "@/components/ui/button"
import { useStoreModal } from "@/hooks/use-modal-hooks"

const CreateStoreButton = () => {
    const storeModal = useStoreModal()
  return (
    <h1> Create A <Button onClick={storeModal.onOpen}>New Store</Button> </h1>
  )
}

export default CreateStoreButton