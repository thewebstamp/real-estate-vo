import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { query } from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // ✅ Await params (required in Next 16)
    const { id } = await context.params;

    const body = await request.json();
    const { featured } = body;

    await query("UPDATE listings SET featured = $1 WHERE id = $2", [
      featured,
      id,
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PATCH featured error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
