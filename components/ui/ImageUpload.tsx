'use client'

import { useEffect, useState } from "react"
import { Button } from "./button"
import { ImagePlus, Trash } from "lucide-react"
import Image from "next/image"
import { CldUploadWidget } from "next-cloudinary"

interface ImageUploadProps{
    disabled: boolean,
    onChange: (value:string) => void,
    onRemove: (value:string) => void,
    value:string[]
}

const ImageUpload: React.FC<ImageUploadProps> = ({ disabled, onChange, onRemove, value }) => {
    console.log(value)
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])
    
    const onUpload = (result:any) => {
        onChange(result.info.secure_url)
    }
    if (!mounted) {
        return null
    }

  return (
      <div>
          <div className="flex mb-4 items-center gap-4">
          {value.map((url)=>(
              <div key={url} className="relative w-[200px] h-[200px] rounded overflow-hidden">
                  <Image fill className="object-cover" alt="Cover Image" src={url} />
                  <div className="absolute top-2 right-2">
                      <Button className="z-50" type="button" onClick={()=>{onRemove(url)}}variant='destructive'size='sm'>
                          <Trash className="w-4 h-4"/>
                      </Button>
                  </div>
          </div>
          ))}
    </div>
          <CldUploadWidget onUpload={onUpload} uploadPreset="tkbxo7as">
              {({ open }) => {
                 const onClick= () => {
                      open()
                  }
                  return (
                      <Button type="button" variant='secondary' onClick={onClick} disabled={disabled}>
                          <ImagePlus className="w-4 h-4 mr-2" />
                          Select an image
                      </Button>
                  )
              }}
          </CldUploadWidget>
      </div>
  )
}

export default ImageUpload