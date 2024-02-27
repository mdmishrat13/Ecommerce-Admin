import prismaDb from "@/lib/prismaDb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export const POST = async(req:Request,{params}:{params:{storeId:string}})=>{
    try {
        const {userId} = auth()
        if(!userId){
            return new NextResponse('Unauthorised!',{status:401})
        }

        const body = await req.json()
        const {name,billboardId} = body
        if(!name){
            return new NextResponse('Name is required!',{status:500})
        }
        if(!billboardId){
            return new NextResponse('Billboard is required!',{status:500})
        }
        if(!params.storeId){
            return new NextResponse('Store not found!',{status:404})
        }

        const storeByUserId = await prismaDb.store.findFirst({
            where: {
                userId,
                id:params.storeId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorised!",{status:403})
        }

        const category = await prismaDb.category.create({
            data:{
                name,
                billboardId,
                storeId:params.storeId
            }
        })
        return NextResponse.json(category)
        
        
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Error :',{status:500})
    }
}


export const GET = async(req:Request,{params}:{params:{storeId:string}})=>{
    try {
        const category = await prismaDb.category.findMany({
            where: {
                storeId:params.storeId
            }
        })
        return NextResponse.json(category)
        
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Error :',{status:500})
    }
}