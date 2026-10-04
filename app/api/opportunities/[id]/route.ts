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

// UPDATE - Admin only
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userHeader = request.headers.get("x-user");

    if (!userHeader) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const user = JSON.parse(userHeader);

    if (user.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Admin access required",
        },
        { status: 403 }
      );
    }

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

// DELETE - Admin only
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userHeader = request.headers.get("x-user");

    if (!userHeader) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const user = JSON.parse(userHeader);

    if (user.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Admin access required",
        },
        { status: 403 }
      );
    }

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