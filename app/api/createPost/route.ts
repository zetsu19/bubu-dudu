import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { image } = await req.json();

  const postImage = await prisma.post.create({
    data: {
      image,
    },
  });

  return NextResponse.json(postImage);
}

export async function GET(req: Request) {
  const { image } = await req.json();

  const postImage = await prisma.post.findMany({
    where: {
      image,
    },
  });

  return NextResponse.json(postImage);
}
