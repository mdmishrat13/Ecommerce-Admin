import Navbar from "@/components/Navbar"
import prismaDb from "@/lib/prismaDb"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

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
        redirect('/')
    }
  return (
    <>
    <Navbar/>
    {children}
    </>
  )
}

export default layout