
import prismaDb from "@/lib/prismaDb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export const GET = async(req:Request,
    {params}:{params:{bilboardId:string}})=>{
    try {
             if(!params.bilboardId){
                 return new NextResponse('Bilboard Not Found',{status:404})
             }
             const billboard = await prismaDb.billboard.findUnique({
                 where:{
                     id:params.bilboardId,
                 }
             })
             return NextResponse.json(billboard)
             
         } catch (error) {
             console.log(error)
         return new NextResponse('Internal Error :',{status:500})
         }
}
     

export const PATCH = async(req:Request,
    {params}:{params:{bilboardId:string,storeId:string}})=>{
        try {
            const {userId} = auth()
            const body = await req.json()

            const {label,imageUrl} = body


            if(!userId){
                return new NextResponse('Unauthenticated',{status:401})
            }

            if(!label){
                return new NextResponse('Label is Required',{status:400})
            }
            if(!imageUrl){
                return new NextResponse('Image is Required',{status:400})
            }


            if(!params.bilboardId){
                return new NextResponse('Bilboard Not Found',{status:404})
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

            const billboard = await prismaDb.billboard.updateMany({
                where:{
                    id:params.bilboardId,
                },
                data:{
                    label,
                    imageUrl
                }

            })

            return NextResponse.json(billboard)
            
        } catch (error) {
            console.log(error)
        return new NextResponse('Internal Error :',{status:500})
        }
    }


    export const DELETE = async(req:Request,
       {params}:{params:{storeId:string,bilboardId:string}})=>{
            try {
                const {userId} = auth()
    
                if(!userId){
                    return new NextResponse('Unauthenticated',{status:401})
                }
    
                if(!params.bilboardId){
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
    
                const billboard = await prismaDb.billboard.deleteMany({
                    where:{
                        id:params.bilboardId,
                    }
                })
                return NextResponse.json(billboard)
                
            } catch (error) {
                console.log(error)
            return new NextResponse('Internal Error :',{status:500})
            }
        }
    