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
        const {label,imageUrl} = body
        if(!label){
            return new NextResponse('Label is required!',{status:500})
        }
        if(!imageUrl){
            return new NextResponse('Image is required!',{status:500})
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

        const billboard = await prismaDb.billboard.create({
            data:{
                label,
                imageUrl,
                storeId:params.storeId
            }
        })
        return NextResponse.json(billboard)
        
        
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Error :',{status:500})
    }
}


export const GET = async(req:Request,{params}:{params:{storeId:string}})=>{
    try {
        const billboards = await prismaDb.billboard.findMany({
            where: {
                storeId:params.storeId
            }
        })
        return NextResponse.json(billboards)
        
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Error :',{status:500})
    }
}