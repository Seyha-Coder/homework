const { Prisma, PrismaClient } = require("@prisma/client");
const { NextResponse } = require("next/server");

const prisma = new PrismaClient();

export async function GET(){
    try {
        const categories = await prisma.categories.findMany();
        return NextResponse.json({
            status: 200,
            message: "All Categories have already fetch.",
            payload: categories
        })
        
    } catch (error) {
        return NextResponse.json({
            status: 404,
            message: "Not found."+error,
        })
    }
}
export async function POST(req, res) {
    try {
        const category_name = await req.json();
        const newCategory = await prisma.categories.createMany({
            data: category_name
        });
           
        return NextResponse.json({
            status: 201,
            message: "Categories have been created successfully.",
            payload: newCategory
        });
    } catch (error) {
        console.error("Error creating categories:", error);
        return NextResponse.json({
            status: 500,
            message: "Internal server error: " + error
        });
    }
}
