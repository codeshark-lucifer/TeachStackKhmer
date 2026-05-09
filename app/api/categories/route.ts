import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/app/lib/firebase-admin";
import { isAuthorized } from "@/app/lib/api-auth";

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const snapshot = await adminDb.ref("data").get();

    if (!snapshot.exists()) {
      return NextResponse.json([]);
    }

    return NextResponse.json(snapshot.val());
  } catch (error: any) {
    console.error("API Error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch categories",
        message: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}