import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { query } from "@/lib/db";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await params;
  const { featured } = await request.json();

  await query("UPDATE listings SET featured = $1 WHERE id = $2", [
    featured,
    id,
  ]);

  return NextResponse.json({ success: true });
}
