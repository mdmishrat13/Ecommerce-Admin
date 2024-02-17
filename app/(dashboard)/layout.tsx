import prismaDb from "@/lib/prismaDb"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { ReactNode } from "react"
import CreateStoreButton from "./CreateStoreButton"

const layout = async({children,params}:{
    children:ReactNode,
    params:{storeId:string}
}) => {
    const {userId} = auth()
    if(!userId){
        redirect('/sign-in')
    }
    const store = await prismaDb.store.findFirst({
        where:{id:params.storeId,
        userId}
    })
    if(!store){
        return <h1>there is no store you may <CreateStoreButton/></h1>
    }
  return (
    <>
    {children}
    </>
  )
}

export default layout