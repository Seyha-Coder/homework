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
        const customers = await req.json();
        const createCustmers = [];
        for(const customerData of customers ){
            const {first_name,last_name,birth_date,money_spent} = customerData;
            const newCus = await prisma.customers.create({
                data:{
                    first_name,
                    last_name,
                    birth_date,
                    money_spent
                },
            })
            createCustmers.push(newCus);
        }
        return NextResponse.json({
            status: 201,
            message: "Customer has already created.",
            count: createCustmers.length,
            payload: createCustmers
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Internal server error." + error,
            
        })
    }
}