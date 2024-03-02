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

        const { name, price,categoryId,sizeId,colorId,archived,featured,images } = body
        
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

        const product = await prismaDb.product.create({
            data:{
                name,
                price,
                colorId,
                sizeId,
                categoryId,
                archived,
                featured,
                storeId: params.storeId,
                images: {
                    createMany: {
                        data: [
                            ...images.map((image:{url:string})=>image)
                        ]
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


export const GET = async(req:Request,{params}:{params:{storeId:string}})=>{
    try {

        const { searchParams } = new URL(req.url)
        const categoryId = searchParams.get("categoryId") || undefined
        const colorId = searchParams.get("colorId") || undefined
        const sizeId = searchParams.get("sizeId") || undefined
        const featured = searchParams.get("featured")
        const archived = searchParams.get("archived")


        const products = await prismaDb.product.findMany({
            where: {
                storeId: params.storeId,
                colorId,
                sizeId,
                categoryId,
                featured: featured ? true : undefined,
                archived:false
            },
            include:{
                images:true,
                category:true,
                color:true,
                size:true
            },
            orderBy: {
                createdAt:"desc"
            }
        })
        return NextResponse.json(products)
        
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Error :',{status:500})
    }
}