
import prismaDb from "@/lib/prismaDb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export const GET = async(req:Request,
    {params}:{params:{sizeId:string}})=>{
    try {
             if(!params.sizeId){
                 return new NextResponse('Size Not Found',{status:404})
             }
             const size = await prismaDb.size.findUnique({
                 where:{
                     id:params.sizeId,
                 }
             })
             return NextResponse.json(size)
             
         } catch (error) {
             console.log(error)
         return new NextResponse('Internal Error :',{status:500})
         }
}
     

export const PATCH = async(req:Request,
    {params}:{params:{sizeId:string,storeId:string}})=>{
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


            if(!params.sizeId){
                return new NextResponse('Size Not Found',{status:404})
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

            const size = await prismaDb.size.updateMany({
                where:{
                    id:params.sizeId,
                },
                data:{
                    name,
                    value
                }

            })

            return NextResponse.json(size)
            
        } catch (error) {
            console.log(error)
        return new NextResponse('Internal Error :',{status:500})
        }
    }


    export const DELETE = async(req:Request,
       {params}:{params:{storeId:string,sizeId:string}})=>{
            try {
                const {userId} = auth()
    
                if(!userId){
                    return new NextResponse('Unauthenticated',{status:401})
                }
    
                if(!params.sizeId){
                    return new NextResponse('Size Not Found',{status:404})
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
    
                const size = await prismaDb.size.deleteMany({
                    where:{
                        id:params.sizeId,
                    }
                })
                return NextResponse.json(size)
                
            } catch (error) {
                console.log(error)
            return new NextResponse('Internal Error :',{status:500})
            }
        }
    