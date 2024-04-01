import { NextResponse } from "next/server";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

export async function GET(req, { params }) {
    try {
        let category = null;

        if (!isNaN(params.category_id)) {
            category = await prisma.categories.findUnique({
                where: {
                    category_id: +params.category_id
                },
            });
        } else {
            category = await prisma.categories.findFirst({
                where: {
                    category_name: params.category_id
                },
            });
        }

        if (category) {
            return NextResponse.json({
                status: 200,
                message: "The category has been found.",
                payload: category
            });
        } else {
            return NextResponse.json({
                status: 404,
                message: "Category not found."
            });
        }
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Internal server error: " + error 
        });
    }
}


export async function PUT(req, {params}){
    try {
        const {category_name} = await req.json();
        const category = await prisma.categories.update({
            where:{
                category_id: +params.category_id
            },
            data:{
                category_name: category_name
            },
        });
        if(category){
            return NextResponse.json({
            status: 200,
            message: "The category "+params.category_id+" has already updated successfully.",
            payload: category
            })
        }
        else{
            return NextResponse.json({
            status: 404,
            message: "Not found."+error,
        })
        }
        
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Internal server error: " + error 
        });
    }
}
export async function DELETE(req, {params}){
    try {
        const del = await prisma.categories.delete({
            where:{
                category_id: +params.category_id
            },
        })
        if(del){
            return NextResponse.json({
            status: 200,
            message: "The category "+params.category_id+" has already deleted successfully.",
            })
        }
        else{
            return NextResponse.json({
            status: 404,
            message: "Not found."+error,
        })
        }
        
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Internal server error: " + error 
        });
    }
}