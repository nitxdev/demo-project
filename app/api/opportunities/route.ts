import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Opportunity from "@/models/Opportunity";

// GET all opportunities
export async function GET() {
  try {
    await connectDB();

    const opportunities = await Opportunity.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      opportunities,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch opportunities",
      },
      { status: 500 }
    );
  }
}

// CREATE opportunity - Admin only
export async function POST(request: NextRequest) {
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

    const body = await request.json();

    const {
      title,
      organization,
      category,
      description,
      branch,
      year,
      skills,
      deadline,
      applyLink,
    } = body;

    if (
      !title ||
      !organization ||
      !category ||
      !description ||
      !deadline ||
      !applyLink
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required fields",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const opportunity = await Opportunity.create({
      title,
      organization,
      category,
      description,
      branch: branch || [],
      year: year || [],
      skills: skills || [],
      deadline,
      applyLink,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Opportunity created successfully",
        opportunity,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create opportunity",
      },
      { status: 500 }
    );
  }
}