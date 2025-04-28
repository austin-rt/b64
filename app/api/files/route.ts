import { NextRequest, NextResponse } from "next/server";
import { IDataURI } from "@/models/DataURI";
import mongoose from "mongoose";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";

// Constants for file size limits
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB per file
const MAX_TOTAL_SIZE = 20 * 1024 * 1024; // 20MB total
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("file");

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    // Check total size
    let totalSize = 0;
    for (const file of files) {
      totalSize += (file as any).size;
    }

    if (totalSize > MAX_TOTAL_SIZE) {
      return NextResponse.json(
        {
          error: `Total file size exceeds ${
            MAX_TOTAL_SIZE / (1024 * 1024)
          }MB limit`,
        },
        { status: 400 }
      );
    }

    // Get user if authenticated
    const { userId } = getAuth(request);
    let user = null;
    if (userId) {
      user = await User.findOne({ clerkId: userId });
    }

    // Process files and convert to base64
    const convertedFiles: IDataURI[] = await Promise.all(
      files.map(async (file: any) => {
        // Check individual file size
        if (file.size > MAX_FILE_SIZE) {
          throw new Error(
            `File ${file.name} exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`
          );
        }

        // Check file type
        if (!ALLOWED_TYPES.includes(file.type)) {
          throw new Error(`File type ${file.type} not allowed`);
        }

        const buffer = await file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString("base64");
        return {
          src: `data:${file.type};base64,${base64}`,
          originalName: `${file.name}-${Date.now()}`,
          mimeType: file.type,
          size: file.size,
          owner: user?._id || null,
          isPublic: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      })
    );

    return NextResponse.json({ files: convertedFiles });
  } catch (error) {
    console.error("Error processing files:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Error processing files",
      },
      { status: 400 }
    );
  }
}
