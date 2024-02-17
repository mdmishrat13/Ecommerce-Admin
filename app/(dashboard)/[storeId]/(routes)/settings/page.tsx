import prismaDb from "@/lib/prismaDb"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import React from "react"
import SettingForm from "./(components)/SettingForm"
import ApiAlert from "@/components/ui/api-alert"

interface SettingProps {
    params:{storeId:string}
}
const page:React.FC<SettingProps>= async({params}) => {
    const {userId} = auth()
    if(!userId){
        redirect('/sign-in')
    }

    const store = await prismaDb.store.findFirst({
        where:{
            id:params.storeId,
            userId
        }
    })

    if(!store){
        redirect('/')
    }
  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-4">
            <SettingForm initialData={store} />
        </div>
        <ApiAlert title="test" description="testing this alert"variant="Public"/>
    </div>
  )
}

export default page