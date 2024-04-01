import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
    try {
        const order = await prisma.orders.findUnique({
            where: {
                order_id: +params.order_id
            }
        });
        if (!order) {
            return NextResponse.json({
                status: 404,
                message: "Order with id "+ params.order_id +" not found."
            });
        }
        return NextResponse.json({
            status: 200,
            message: "The order " + params.order_id + " has already been founded.",
            payload: order
        });
    } catch (error) {
        if (error.code === "P2025") {
            return NextResponse.json({
                status: 404,
                message: "Order with id " + params.order_id + " not found."
            });
        } else {
            return NextResponse.json({
                status: 500,
                message: "Internal server error.",
                error: error.message
            });
        }
    }
}
export async function PUT(req,{params}){
    try {
        const {customer_id,product_id,order_qty} = await req.json();
        const product = await prisma.products.findUnique({
            where:{
                product_id:product_id
            }
        })
        const order = await prisma.orders.update({
            where:{
                order_id : +params.order_id
            },
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
            message: "Order with id "+params.order_id+" has updated successfully",
            payload: order
        });
        
    } catch (error) {
        if (error.code === "P2025") {
            return NextResponse.json({
                status: 404,
                message: "Order with id " + params.order_id + " not found."
            });
        } else {
            return NextResponse.json({
                status: 500,
                message: "Internal server error.",
                error: error.message
            });
        }
    }
}

export async function DELETE(req, { params }) {
    try {
        const del = await prisma.orders.delete({
            where: {
                order_id: +params.order_id
            }
        });

        return NextResponse.json({
            status: 200,
            message: "The order " + params.order_id + " has been deleted.",
        });
    } catch (error) {
        if (error.code === "P2025") {
            return NextResponse.json({
                status: 404,
                message: "Order with id " + params.order_id + " not found."
            });
        } else {
            return NextResponse.json({
                status: 500,
                message: "Internal server error.",
                error: error.message
            });
        }
    }
}
