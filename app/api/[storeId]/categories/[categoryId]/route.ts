
import prismaDb from "@/lib/prismaDb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export const GET = async(req:Request,
    {params}:{params:{categoryId:string}})=>{
    try {
             if(!params.categoryId){
                 return new NextResponse('Bilboard Not Found',{status:404})
             }
             const category = await prismaDb.billboard.findUnique({
                 where:{
                     id:params.categoryId,
                 }
             })
             return NextResponse.json(category)
             
         } catch (error) {
             console.log(error)
         return new NextResponse('Internal Error :',{status:500})
         }
}
     

export const PATCH = async(req:Request,
    {params}:{params:{categoryId:string,storeId:string}})=>{
        try {
            const {userId} = auth()
            const body = await req.json()

            const {name,billboardId} = body


            if(!userId){
                return new NextResponse('Unauthenticated',{status:401})
            }

            if(!name){
                return new NextResponse('Name is Required',{status:400})
            }
            if(!billboardId){
                return new NextResponse('Billboard is Required',{status:400})
            }


            if(!params.categoryId){
                return new NextResponse('Category Not Found',{status:404})
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

            const category = await prismaDb.category.updateMany({
                where:{
                    id:params.categoryId,
                },
                data:{
                    name,
                    billboardId
                }

            })

            return NextResponse.json(category)
            
        } catch (error) {
            console.log(error)
        return new NextResponse('Internal Error :',{status:500})
        }
    }


    export const DELETE = async(req:Request,
       {params}:{params:{storeId:string,categoryId:string}})=>{
            try {
                const {userId} = auth()
    
                if(!userId){
                    return new NextResponse('Unauthenticated',{status:401})
                }
    
                if(!params.categoryId){
                    return new NextResponse('Category Not Found',{status:404})
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
    
                const category = await prismaDb.category.deleteMany({
                    where:{
                        id:params.categoryId,
                    }
                })
                return NextResponse.json(category)
                
            } catch (error) {
                console.log(error)
            return new NextResponse('Internal Error :',{status:500})
            }
        }
    