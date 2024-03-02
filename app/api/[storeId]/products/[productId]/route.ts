
import prismaDb from "@/lib/prismaDb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export const GET = async(req:Request,
    {params}:{params:{productId:string}})=>{
    try {
             if(!params.productId){
                 return new NextResponse('Product Not Found!',{status:404})
             }
             const product = await prismaDb.product.findUnique({
                 where:{
                     id:params.productId,
                 },
                 include: {
                     images: true,
                     size: true,
                     color: true,
                     category:true
                 }
             })
             return NextResponse.json(product)
             
         } catch (error) {
             console.log(error)
         return new NextResponse('Internal Error :',{status:500})
         }
}
     

export const PATCH = async(req:Request,
    {params}:{params:{productId:string,storeId:string}})=>{
        try {
            const {userId} = auth()
            const body = await req.json()

            const { name, price,categoryId,sizeId,colorId,archived,featured,images } = body


            if(!userId){
                return new NextResponse('Unauthenticated',{status:401})
            }

            if(!name){
                return new NextResponse('Name is required!',{status:500})
            }
            if(!price){
                return new NextResponse('Price is required!',{status:500})
            }
            if(!categoryId){
                return new NextResponse('Category is required!',{status:500})
            }
            if(!sizeId){
                return new NextResponse('Size is required!',{status:500})
            }
            if(!colorId){
                return new NextResponse('Color is required!',{status:500})
            }
            if(!images||!images.length){
                return new NextResponse('Image is required!',{status:404})
            }

            if(!params.productId){
                return new NextResponse('Product Not Found',{status:404})
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

            await prismaDb.product.update({
                where:{
                    id:params.productId,
                },
                data:{
                    name,
                    price,
                    colorId,
                    sizeId,
                    categoryId,
                    archived,
                    featured,
                    images: {
                        deleteMany:{}
                    },
                    storeId: params.storeId,
                }

            })
            const product = await prismaDb.product.update({
                where: {
                    id:params.productId
                },
                data: {
                    images: {
                        createMany: {
                            data:[...images.map((image:{url:string})=>image)]
                        }
                    }
                }
            })

            return NextResponse.json(product)
            
        } catch (error) {
            console.log(error)
        return new NextResponse('Internal Error :',{status:500})
        }
    }


    export const DELETE = async(req:Request,
       {params}:{params:{storeId:string,productId:string}})=>{
            try {
                const {userId} = auth()
    
                if(!userId){
                    return new NextResponse('Unauthenticated',{status:401})
                }
    
                if(!params.productId){
                    return new NextResponse('Product Not Found',{status:404})
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
    
                const product = await prismaDb.product.deleteMany({
                    where:{
                        id:params.productId,
                    }
                })
                return NextResponse.json(product)
                
            } catch (error) {
                console.log(error)
            return new NextResponse('Internal Error :',{status:500})
            }
        }
    