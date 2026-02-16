import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        images: { orderBy: { order: "asc" } },
        category: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(products);
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
    const { images, ...productData } = body;

    const product = await prisma.product.create({
      data: {
        ...productData,
        images: {
          create: images?.map(
            (
              img: { url: string; publicId?: string; order?: number },
              index: number
            ) => ({
              url: img.url,
              publicId: img.publicId || null,
              order: img.order ?? index,
            })
          ),
        },
      },
      include: { images: true, category: true },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create product";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
