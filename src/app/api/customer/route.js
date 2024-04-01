import { NextResponse } from "next/server";

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export async function GET(){
    try {
        const customers = await prisma.customers.findMany();
        return NextResponse.json({
            status: 200,
            message: "All customer has already fetch.",
            payload: customers
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Internal server error." + error,
        })
    }
}

export async function POST(req, res){
    try {
        
            const data = await req.json();
            const newCus = await prisma.customers.create({
                data:data
            })
            
        return NextResponse.json({
            status: 201,
            message: "Customer has already created.",
            payload: newCus
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Internal server error." + error,
            
        })
    }
}