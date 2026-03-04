import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    let images: string[] = [];

    if (Array.isArray(body.images)) {
      images = body.images;
    } else if (body.image) {
      images = [body.image];
    }

    const post = await prisma.post.create({
      data: {
        images,
      },
    });

    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "Create post failed" }, { status: 500 });
  }
}
