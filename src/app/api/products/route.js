import { NextResponse } from "next/server";

const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient();

export async function GET(){
    try {
        const products = await prisma.products.findMany();
        return NextResponse.json({
            status: 200,
            message: "All products has already fetch.",
            payload: products
        })
    } catch (error) {
        return NextResponse.json({
            status: 404,
            message: "Not found." + error,
        })
    }
    
}
export async function POST(req,res){
    try {
        const {product_name,price,category_id} = await req.json();
        const product = await prisma.products.create({
            data:{
                category_id: category_id,
                product_name: product_name,
                price: price
            }
        });
        return NextResponse.json({
            status: 201,
            message: "The product has created successfully.",
            payload: product
        })
    } catch (error) {
        return NextResponse.json({
            status: 404,
            message: "Not found." + error,
        })
    }
}