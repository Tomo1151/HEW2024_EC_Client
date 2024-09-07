import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("http://localhost:3000/version");

    if (!res.ok) {
      throw new Error("Request failed with status code: " + res.status);
    }

    const resjson = await res.json();
    return NextResponse.json(resjson);
  } catch (error) {
    // console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
