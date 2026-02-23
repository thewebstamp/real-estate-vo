import { NextResponse } from "next/server";
import { getUploadSignature } from "@/lib/cloudinary";

export async function GET() {
  try {
    const { timestamp, signature, folder } = await getUploadSignature();
    return NextResponse.json({
      timestamp,
      signature,
      folder,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate signature" },
      { status: 500 },
    );
  }
}
