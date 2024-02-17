
import prismaDb from "@/lib/prismaDb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export const PATCH = async(req:Request,
    {params}:{params:{storeId:string}})=>{
        try {
            const {userId} = auth()
            const body = await req.json()

            const {name} = body


            if(!userId){
                return new NextResponse('Unauthenticated',{status:401})
            }

            if(!name){
                return new NextResponse('Name is Required',{status:400})
            }


            if(!params.storeId){
                return new NextResponse('Store Not Found',{status:404})
            }

            const store = await prismaDb.store.updateMany({
                where:{
                    id:params.storeId,
                    userId
                },
                data:{
                    name
                }

            })

            return NextResponse.json(store)
            
        } catch (error) {
            console.log(error)
        return new NextResponse('Internal Error :',{status:500})
        }
    }


    export const DELETE = async(req:Request,
       {params}:{params:{storeId:string}})=>{
            try {
                const {userId} = auth()
    
                if(!userId){
                    return new NextResponse('Unauthenticated',{status:401})
                }
    
                if(!params.storeId){
                    return new NextResponse('Store Not Found',{status:404})
                }
    
                const store = await prismaDb.store.deleteMany({
                    where:{
                        id:params.storeId,
                        userId
                    }
                })
    
                return NextResponse.json(store)
                
            } catch (error) {
                console.log(error)
            return new NextResponse('Internal Error :',{status:500})
            }
        }
    