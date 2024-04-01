import { NextResponse } from "next/server";

const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient();

export async function GET(req,{params}){
    try {
        const customer = await prisma.customers.findUnique({
            where:{
                customer_id: +params.customer_id
            }
        });
        if(customer){
            return NextResponse.json({
                status: 200,
                message: "The customer with id "+params.customer_id+" has found.",
                payload: customer
            })
        }else{
            return NextResponse.json({
                status: 404,
                message: "Order with id " + params.customer_id + " not found."
            });
        }
    } catch (error) {
        if (error.code === "P2025") {
            return NextResponse.json({
                status: 404,
                message: "Order with id " + params.customer_id + " not found."
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
        const {first_name,last_name,birth_date,money_spent} = await req.json();
        const customer = await prisma.customers.update({
            where:{
                customer_id: +params.customer_id
            },
            data:{
                first_name: first_name,
                last_name: last_name,
                birth_date: birth_date,
                money_spent: money_spent
            }
        });
        return NextResponse.json({
            status: 200,
            message: "The customer "+params.customer_id+" has already updated successfully",
            payload: customer
        })
    } catch (error) {
        if (error.code === "P2025") {
            return NextResponse.json({
                status: 404,
                message: "Order with id " + params.customer_id + " not found."
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
export async function DELETE(req, {params}){
    try {
        const del = await prisma.customers.delete({
            where:{
                customer_id: +params.customer_id
            }
        })
        return NextResponse.json({
            status: 200,
            message: "The customer "+params.customer_id+" has already deleted",
        })
    } catch (error) {
        if (error.code === "P2025") {
            return NextResponse.json({
                status: 404,
                message: "Order with id " + params.customer_id + " not found."
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