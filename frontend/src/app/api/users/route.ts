import api from "@/lib/axiosInstance";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const backendRes = await api.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(backendRes.data?.data, {
      status: backendRes.status,
    });
  } catch (error: any) {
    return NextResponse.json(
      error.response?.data || {
        success: false,
        message: "Failed to fetch users",
      },
      { status: error.response?.status || 500 }
    );
  }
}
