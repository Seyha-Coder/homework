import { NextResponse } from "next/server";

const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient();

export async function GET(){
    
    try {
        const orders = await prisma.orders.findMany();
        return NextResponse.json({
            status: 200,
            message: "All orders have already fetch.",
            payload: orders
        });
        
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Internal server error." + error,
        });
    }
}
export async function POST(req,res){
    try {
        const {customer_id,product_id,order_qty} = await req.json();
        const product = await prisma.products.findUnique({
            where:{
                product_id:product_id
            }
        })
        const order = await prisma.orders.create({
            data:{
                customer_id:customer_id,
                product_id:product_id,
                order_total: order_qty * product.price,
                order_qty: order_qty,
                order_date: new Date()
            }
        });
        return NextResponse.json({
            status: 201,
            message: "Order successfully",
            payload: order
        });
        
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Internal server error." +error,
        });
    }
}