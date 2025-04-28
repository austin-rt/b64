import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import User from "@/models/User";
import { IDataURI } from "@/models/DataURI";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { dataURI } = body;

    if (!dataURI) {
      return NextResponse.json(
        { error: "No dataURI provided" },
        { status: 400 }
      );
    }

    // Find user and verify ownership
    const user = await User.findOne({ _id: params.id, clerkId: userId });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Add the DataURI to the user's images
    const newDataURI: IDataURI = {
      src: dataURI.src,
      originalName: dataURI.originalName,
      mimeType: dataURI.mimeType,
      size: dataURI.size,
      owner: user._id,
      isPublic: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    user.images.push(newDataURI);
    await user.save();

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error updating user" },
      { status: 500 }
    );
  }
}
