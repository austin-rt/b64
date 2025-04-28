import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  const { userId } = getAuth(request);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    // Check if user exists
    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      // Create new user
      user = await User.create({
        clerkId: userId,
      });
    }

    return NextResponse.json({
      success: true,
      message: "User stored successfully",
      userId: user._id,
    });
  } catch (error) {
    console.error("Error storing user:", error);
    return NextResponse.json({ error: "Error storing user" }, { status: 500 });
  }
}
