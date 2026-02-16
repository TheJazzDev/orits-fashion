import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(images);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const image = await prisma.galleryImage.create({
      data: {
        url: body.url,
        publicId: body.publicId || null,
        title: body.title || null,
        description: body.description || null,
        order: body.order || 0,
      },
    });
    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to add gallery image";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
