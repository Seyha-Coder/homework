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
        const categories = await req.json();

        const createdCategories = [];
        for (const categoryData of categories) {
            const { category_name } = categoryData;
            const newCategory = await prisma.categories.create({
                data: {
                    category_name
                }
            });
            createdCategories.push(newCategory);
        }

        return NextResponse.json({
            status: 201,
            message: "Categories have been created successfully.",
            count: createdCategories.length,
            payload: createdCategories
        });
    } catch (error) {
        console.error("Error creating categories:", error);
        return NextResponse.json({
            status: 500,
            message: "Internal server error: " + error
        });
    }
}
