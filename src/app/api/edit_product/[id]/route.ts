import { connectMongoDB } from "@/libs/MongoConnect";
import Product from "@/libs/models/Products";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Parse the body
    const body = await request.json();
    const { name, category, price } = body;

    // Extract ID from URL params
    const id = params.id;

    // Check if required fields are present
    if (!id || !name || !category || !price) {
      return NextResponse.json(
        { msg: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectMongoDB();

    // Find and update the product
    const data = await Product.findByIdAndUpdate(
      id,
      { name, category, price },
      { new: true } // Optionally return the updated document
    );

    // Check if the product was found and updated
    if (!data) {
      return NextResponse.json({ msg: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ msg: "Updated Successfully", data });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json(
      { msg: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
