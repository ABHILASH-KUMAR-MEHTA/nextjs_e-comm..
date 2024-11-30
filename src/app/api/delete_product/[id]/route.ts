import { connectMongoDB } from "@/libs/MongoConnect";
import Product from "@/libs/models/Products";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Extract ID from params
    const id = params.id;

    // Connect to the database
    await connectMongoDB();

    // Delete the product by ID
    await Product.findByIdAndDelete(id);

    return NextResponse.json({ msg: "Product Deleted Successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json(
      { msg: "Something went wrong", error },
      { status: 400 }
    );
  }
}
