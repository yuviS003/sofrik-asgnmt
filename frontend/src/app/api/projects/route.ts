import { NextResponse } from "next/server";
import api from "@/lib/axiosInstance";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const backendRes = await api.get(id ? `/projects/${id}` : "/projects", {
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
        message: "Failed to fetch projects",
      },
      { status: error.response?.status || 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const backendRes = await api.post("/projects", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(backendRes.data, {
      status: backendRes.status,
    });
  } catch (error: any) {
    return NextResponse.json(
      error.response?.data || {
        success: false,
        message: "Failed to create project",
      },
      { status: error.response?.status || 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Project ID is required" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const backendRes = await api.delete(`/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(backendRes.data, {
      status: backendRes.status,
    });
  } catch (error: any) {
    return NextResponse.json(
      error.response?.data || {
        success: false,
        message: "Failed to delete project",
      },
      { status: error.response?.status || 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Project ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const backendRes = await api.put(`/projects/${id}`, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(backendRes.data, {
      status: backendRes.status,
    });
  } catch (error: any) {
    return NextResponse.json(
      error.response?.data || {
        success: false,
        message: "Failed to update project",
      },
      { status: error.response?.status || 500 }
    );
  }
}
