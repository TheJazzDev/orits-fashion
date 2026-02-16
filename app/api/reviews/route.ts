import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(reviews);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.content) {
      return NextResponse.json(
        { error: "Name and review content are required" },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        name: body.name,
        email: body.email || null,
        rating: body.rating || 5,
        content: body.content,
        approved: false,
        featured: false,
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to submit review";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
