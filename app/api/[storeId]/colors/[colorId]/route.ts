
import prismaDb from "@/lib/prismaDb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export const GET = async(req:Request,
    {params}:{params:{colorId:string}})=>{
    try {
             if(!params.colorId){
                 return new NextResponse('Color Not Found',{status:404})
             }
             const color = await prismaDb.color.findUnique({
                 where:{
                     id:params.colorId,
                 }
             })
             return NextResponse.json(color)
             
         } catch (error) {
             console.log(error)
         return new NextResponse('Internal Error :',{status:500})
         }
}
     

export const PATCH = async(req:Request,
    {params}:{params:{colorId:string,storeId:string}})=>{
        try {
            const {userId} = auth()
            const body = await req.json()

            const {name,value} = body


            if(!userId){
                return new NextResponse('Unauthenticated',{status:401})
            }

            if(!name){
                return new NextResponse('Name is Required',{status:400})
            }
            if(!value){
                return new NextResponse('Value is Required',{status:400})
            }


            if(!params.colorId){
                return new NextResponse('Color Not Found',{status:404})
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

            const color = await prismaDb.color.updateMany({
                where:{
                    id:params.colorId,
                },
                data:{
                    name,
                    value
                }

            })

            return NextResponse.json(color)
            
        } catch (error) {
            console.log(error)
        return new NextResponse('Internal Error :',{status:500})
        }
    }


    export const DELETE = async(req:Request,
       {params}:{params:{storeId:string,colorId:string}})=>{
            try {
                const {userId} = auth()
    
                if(!userId){
                    return new NextResponse('Unauthenticated',{status:401})
                }
    
                if(!params.colorId){
                    return new NextResponse('Billboard Not Found',{status:404})
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
    
                const color = await prismaDb.color.deleteMany({
                    where:{
                        id:params.colorId,
                    }
                })
                return NextResponse.json(color)
                
            } catch (error) {
                console.log(error)
            return new NextResponse('Internal Error :',{status:500})
            }
        }
    