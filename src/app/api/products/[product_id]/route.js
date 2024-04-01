import { NextResponse } from "next/server";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export async function GET(req, {params}){
    try {
        let product = null;
        
        if (!isNaN(params.product_id)) {
             product = await prisma.products.findUnique({
                where:{
                    product_id: +params.product_id
                }
            })
        } else {
            product = await prisma.products.findFirst({
                where: {
                    product_name: params.category_id
                },
            });
        }

        if (product) {
            return NextResponse.json({
                status: 200,
                message: "The product "+params.product_id+" has found.",
                payload: product
            });
        } else {
            return NextResponse.json({
                status: 404,
                message: "Not found."
            });
        }
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Internal server error" + error,
        });
    }
}
export async function PUT(req, { params }) {
    try {
        const { product_name, price, category_id } = await req.json();
        const productId = +params.product_id;
        
        const product = await prisma.products.update({
            where: {
                product_id: productId
            },
            data: {
                category_id: category_id,
                product_name: product_name,
                price: price
            }
        });

        return NextResponse.json({
            status: 200,
            message: "The product has been updated successfully.",
            payload: product
        });
    } catch (error) {
        if ( error.code === 'P2025') {
           
            return NextResponse.json({
                status: 404,
                message: "Product not found."
            });
        } else {
            return NextResponse.json({
                status: 500,
                message: "Internal server error: " + error,
            });
        }
    }
}

export async function DELETE(req, {params}){
    try {
        const del = await prisma.products.delete({
            where:{
                product_id: +params.product_id
            }
        })
        if(del){
            return NextResponse.json({
                status: 200,
                message: "The product "+params.product_id+" has already deleted",
            })
        }else{
            return NextResponse.json({
                status: 404,
                message: "Not found" + error,
            })
        }
        
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Internal server error" + error,
        });
    }
}