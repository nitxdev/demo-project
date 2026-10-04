import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function PUT(request: NextRequest) {
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

    const currentUser = JSON.parse(userHeader);

    if (currentUser.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message: "Admin access required",
        },
        { status: 403 }
      );
    }

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOneAndUpdate(
      {
        email: email.toLowerCase(),
      },
      {
        role: "admin",
      },
      {
        new: true,
      }
    );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `${user.name} is now an admin`,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to make admin",
      },
      { status: 500 }
    );
  }
}