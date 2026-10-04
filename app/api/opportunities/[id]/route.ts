import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Opportunity from "@/models/Opportunity";

// GET one opportunity
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await connectDB();

    const opportunity = await Opportunity.findById(id);

    if (!opportunity) {
      return NextResponse.json(
        {
          success: false,
          message: "Opportunity not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      opportunity,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch opportunity",
      },
      { status: 500 }
    );
  }
}

// UPDATE opportunity
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    await connectDB();

    const opportunity = await Opportunity.findByIdAndUpdate(
      id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!opportunity) {
      return NextResponse.json(
        {
          success: false,
          message: "Opportunity not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Opportunity updated successfully",
      opportunity,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update opportunity",
      },
      { status: 500 }
    );
  }
}

// DELETE opportunity
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await connectDB();

    const opportunity = await Opportunity.findByIdAndDelete(id);

    if (!opportunity) {
      return NextResponse.json(
        {
          success: false,
          message: "Opportunity not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Opportunity deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete opportunity",
      },
      { status: 500 }
    );
  }
}
