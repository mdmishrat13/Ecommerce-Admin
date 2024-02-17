import prismaDb from "@/lib/prismaDb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export const POST = async(req:Request)=>{
    try {
        const {userId} = auth()
        if(!userId){
            return new NextResponse('Unauthorised!',{status:401})
        }

        const body = await req.json()
        const {name} = body
        if(!name){
            return new NextResponse('Name is required!',{status:500})
        }

        const store = await prismaDb.store.create({
            data:{
                name,
                userId
            }
        })
        return NextResponse.json(store)
        
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Error :',{status:500})
    }
}