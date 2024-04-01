import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
    try {
        const order = await prisma.orders.findMany({
            where: {
                customer_id: +params.customer_id
            }
        });
        if (!order) {
            return NextResponse.json({
                status: 404,
                message: "Order with id "+ params.customer_id +" not found."
            });
        }
        return NextResponse.json({
            status: 200,
            message: "The order " + params.customer_id + " has already been fetched.",
            payload: order
        });
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Internal server error.",
            error: error.message
        });
    }
}