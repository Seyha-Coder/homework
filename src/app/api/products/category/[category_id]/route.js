import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
    try {
        const products = await prisma.products.findMany({
            where: {
                category_id: +params.category_id
            }
        });

        return NextResponse.json({
            status: 200,
            message: "Products with category "+params.category_id+" has founded.",
            payload: products
        });
    } catch (error) {
        return NextResponse.json({
            status: 404,
            message: "Not found." + error,
        });
    }
}
