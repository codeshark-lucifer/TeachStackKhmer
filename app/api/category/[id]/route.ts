import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/app/lib/firebase-admin";
import { isAuthorized } from "@/app/lib/api-auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { id } = await params;

  try {
    const snapshot = await adminDb.ref("data").get();

    if (!snapshot.exists()) {
      return NextResponse.json(
        { error: "Not found" },
        { status: 404 }
      );
    }

    const data = snapshot.val();
    const categories = Array.isArray(data)
      ? data
      : Object.values(data);

    const category = categories.find(
      (item: any) => item.id === id
    );

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}