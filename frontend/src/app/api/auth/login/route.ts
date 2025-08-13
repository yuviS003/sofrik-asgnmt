import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import api from "@/lib/axiosInstance";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const backendRes = await api.post("/auth/login", body);

    const { token, success } = backendRes.data;

    if (success && token) {
      const cookieStore = await cookies();
      cookieStore.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return NextResponse.json(backendRes.data, { status: backendRes.status });
  } catch (error: any) {
    return NextResponse.json(
      error.response?.data || {
        success: false,
        message: "Login request failed",
      },
      { status: error.response?.status || 500 }
    );
  }
}
