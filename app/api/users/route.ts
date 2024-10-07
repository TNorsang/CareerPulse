import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export async function POST(request: Request) {
  try {
    const { username, jobStatus } = await request.json();

    if (!username || !jobStatus) {
      return NextResponse.json(
        {
          error: "Missing required fields",
        },
        { status: 400 }
      );
    }
    const user = await prisma.user.create({
      data: {
        username,
        jobStatus,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
