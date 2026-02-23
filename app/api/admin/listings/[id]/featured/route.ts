import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { query } from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin")
    return new NextResponse("Unauthorized", { status: 401 });

  const { id } = await context.params;
  const { featured } = await request.json();

  try {
    await query("UPDATE listings SET featured=$1 WHERE id=$2", [featured, id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PATCH featured error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
